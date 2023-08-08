import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, getFirestore, Query, query, updateDoc, where } from "firebase/firestore";
import { app, storage } from "./firebase";
import { Ad, NewReview, NewGoogleUser, Review, UpdateAd, GoogleUser, NewBookedDates, BookedDate, NewReservation, Reservation } from "../types/types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "./firebase";

const firestore = getFirestore(app);


// Define your authentication functions
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  // check if user exist in database
  const users = await getDocs(usersCollection);
  const user = users.docs.find((user) => user.data().uid === result.user.uid);
  if (!user?.exists()) {
    // create user in database
    const userData: NewGoogleUser = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      myAds: [],
      savedAds: [],
      myReviews: [],
    };
    await addGoogleUser(userData);
  }
  return result.user;
};

export const logOut = async () => {
  await auth.signOut();
};

export const addGoogleUser = async (userData: NewGoogleUser) => {
  await addDoc(usersCollection, { ...userData });
};

export async function getUserFromUid(uid: string) {
  const q = query(usersCollection, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return;
  }

  const asd = snapshot.docs.map((doc) => {
    const user: GoogleUser = {
      id: snapshot.docs[0].id,
      uid: doc.data().uid,
      displayName: doc.data().displayName,
      photoURL: doc.data().photoURL,
      email: doc.data().email,
      phoneNumber: doc.data().phoneNumber,
      myAds: doc.data().myAds,
      savedAds: doc.data().savedAds,
      myReviews: doc.data().myReviews,
    };
    return user;
  });

  return asd[0];
}


// CRUD FUNCTIONS
// CREATE A NEW ADD
export const addAd = async (adData: any) => {
  const newAd = await addDoc(collection(firestore, `ads`), { ...adData });
  // add string adId to user's myAds array
  const userDoc = doc(firestore, `users/${adData.userid}`);
  const user = await getDoc(userDoc);
  if (user.exists()) {
    const userData = user.data();
    const myAds = userData.myAds || []; // use default empty array if myAds is undefined
    myAds.push(newAd.id);
    await updateDoc(userDoc, { myAds });
  } 
};

// Book a product
export async function addBookedDates(bookedDatesData: NewBookedDates) {
  const res = await addDoc(bookedDatesCollection, { ...bookedDatesData });

  const adDoc = doc(firestore, `ads/${bookedDatesData.adId}`);
  const ad = await getDoc(adDoc);
  if (ad.exists()) {
    const adData = ad.data();
    const bookedDates = adData.bookedDates || []; // use default empty array if reviews is undefined
    bookedDates.push(res.id);
    await updateDoc(adDoc, { bookedDates });
  } 
  if (res) {
    return true;
  } else {
    return false;
  }
}

export async function addReservation(reservationData: NewReservation) {
  const res = await addDoc(reservationCollection, { ...reservationData });
  const userDoc = doc(firestore, `users/${reservationData.userId}`);
  const user = await getDoc(userDoc);
  if (user.exists()) {
    const userData = user.data();
    const reservations = userData.reservations || [];
    reservations.push(res.id);
    await updateDoc(userDoc, { reservations });
  } 
  if (res) {
    return true;
  } else {
    return false;
  }
}

// Create a new review
export async function addReview(reviewData: NewReview) {
  const res = await addDoc(reviewCollection, { ...reviewData });
  // add reviewId to user's myReviews array
  const userDoc = doc(firestore, `users/${reviewData.userId}`);
  const user = await getDoc(userDoc);
  if (user.exists()) {
    const userData = user.data();
    const myReviews = userData.myReviews || []; // use default empty array if myReviews is undefined
    myReviews.push(res.id);
    await updateDoc(userDoc, { myReviews });
  } 
  // add reviewId to ad's reviews array
  const adDoc = doc(firestore, `ads/${reviewData.adId}`);
  const ad = await getDoc(adDoc);
  if (ad.exists()) {
    const adData = ad.data();
    const reviews = adData.reviews || []; // use default empty array if reviews is undefined
    reviews.push(res.id);
    await updateDoc(adDoc, { reviews });
  } 
  if (res) {
    return true;
  } else {
    return false;
  }
}

// check if user has already reviewed this ad
export async function checkReview(userId: string, adId: string) {
  const q = query(reviewCollection, where("userId", "==", userId), where("adId", "==", adId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return false;
  } else {
    return true;
  }
}

// READ
export const usersCollection = collection(firestore, "users"); // Get all users
export const adsCollection = collection(firestore, "ads"); // Get all ads
export const reviewCollection = collection(firestore, "reviews"); // Get all reviews
export const bookedDatesCollection = collection(firestore, "bookedDates"); // Get all bookedDates
export const reservationCollection = collection(firestore, "reservations");


// Query for filtering ads by category, price (min, max), location (zip) and search term
export const AdsQuery = async (
  search: string | undefined = undefined,
  category: string | undefined = undefined,
  minPrice: number | undefined = undefined,
  maxPrice: number | undefined = undefined,
  zipCode: number | undefined = undefined,
) => {
  let qTitle: Query<DocumentData> = adsCollection;
  let qPrice: Query<DocumentData> = adsCollection;
  let qCategory: Query<DocumentData> = adsCollection;
  let qDescription: Query<DocumentData> = adsCollection;
  let qZipCode: Query<DocumentData> = adsCollection;

  minPrice = Number(minPrice)
  maxPrice = Number(maxPrice)
  zipCode = Number(zipCode)

  if (search) {
    qTitle = query(qTitle, where("title", ">=", search));
    qTitle = query(qTitle, where("title", "<=", search + "\uf8ff"));
    qDescription = query(qDescription, where("description", ">=", search));
    qDescription = query(qDescription, where("description", "<=", search + "\uf8ff"));
  }

  if (minPrice) {
    qPrice = query(qPrice, where("price", ">=", minPrice));
  }
  if (maxPrice) {
    qPrice = query(qPrice, where("price", "<=", maxPrice));
  }

  if (category) {
    qTitle = query(qTitle, where("category", "==", category));
    qPrice = query(qPrice, where("category", "==", category));
    qCategory = query(qCategory, where("category", "==", category));
    qDescription = query(qDescription, where("category", "==", category));
  }

  if (zipCode) {
    // range query for zip codes within 50 
    qZipCode = query(qZipCode, where("zip", ">=", zipCode - 50));
    qZipCode = query(qZipCode, where("zip", "<=", zipCode + 50));
  }

  const [titleSnapshot, descriptionSnapshot, priceSnapshot, categorySnapshot, zipCodeSnapshot] = await Promise.all([
    getDocs(qTitle),
    getDocs(qDescription),
    getDocs(qPrice),
    getDocs(qCategory),
    getDocs(qZipCode),
  ]);

  const titleAds: Ad[] = [];
  titleSnapshot.forEach((doc) => {
    titleAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const descriptionAds: Ad[] = [];
  descriptionSnapshot.forEach((doc) => {
    descriptionAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const priceAds: Ad[] = [];
  priceSnapshot.forEach((doc) => {
    priceAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const categoryAds: Ad[] = [];
  categorySnapshot.forEach((doc) => {
    categoryAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });

  const zipCodeAds: Ad[] = [];
  zipCodeSnapshot.forEach((doc) => {
    zipCodeAds.push({
      id: doc.id,
      userid: doc.data().userid,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      price: doc.data().price,
      address: doc.data().address,
      zip: doc.data().zip,
      city: doc.data().city,
      pictures: doc.data().pictures,
    });
  });


  let ads = categoryAds.filter((ad) =>
    priceAds.find((priceAd) => priceAd.id === ad.id)
  );
  ads = ads.filter((ad) =>
    titleAds.find((titleAd) => titleAd.id === ad.id) || descriptionAds.find((descriptionAd) => descriptionAd.id === ad.id)
  );
  ads = ads.filter((ad) =>
    zipCodeAds.find((zipCodeAd) => zipCodeAd.id === ad.id)
  );
  return ads;
};


// GET SPECIFIC USER
export const getUser = async (id: string) => {
  const document = doc(firestore, `users/${id}`);
  const user = await getDoc(document);
  return user;
};

// GET SPECIFIC RESERVATION
export const getSpesificReservation = async (id: string) => {
  const document = doc(firestore, `reservations/${id}`);
  const reservation = await getDoc(document);
  return reservation;
}

// Get ad when clicking on ad
export const getAd = async (adId: string) => {
  const document = doc(firestore, `ads/${adId}`);
  try {
    const ad = await getDoc(document);
    if (ad.exists()) {
      return ad;
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error getting ad with ID ${adId}: ${error}`);
    throw error;
  }
};

export const getReservation = async (reservationId: string) => {
  const document = doc(firestore, `reservations/${reservationId}`);
  try {
    const reservation = await getDoc(document);
    if (reservation.exists()) {
      return reservation;
    }
    else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting reservation with ID ${reservationId}: ${error}`);
    throw error;
  }
}

export const getUserReservation = async (id: string) => {
  const user = await getUser(id);
  const userReservations: Reservation[] = [];
  if (user.exists() && user.data().reservations) {
    const reservations = user.data().reservations;
    const reservationPromises = reservations.map(async (reservationId: string) => {
      const reservation = await getReservation(reservationId);
      if (reservation !== null && reservation.exists()) {
        return {
          id: reservation.id,
          userId: reservation.data().userId,
          adId: reservation.data().adId,
          startDate: reservation.data().startDate,
          endDate: reservation.data().endDate,
        };
      }
      return null;
    });
    const reservationResults = await Promise.all(reservationPromises);
    userReservations.push(...reservationResults.filter((reservation) => reservation !== null));
  }
  return userReservations
}

// Get all ads from a specific user
export const getUserAds = async (id: string) => {
  const user = await getUser(id);
  const userAds: Ad[] = [];
  if (user.exists() && user.data().myAds) {
    const myAds = user.data().myAds;
    const adPromises = myAds.map(async (adId: string) => {
      const ad = await getAd(adId);
      if (ad !== null && ad.exists()) {
        return {
          id: ad.id,
          userid: ad.data().userid,
          title: ad.data().title,
          description: ad.data().description,
          category: ad.data().category,
          price: ad.data().price,
          address: ad.data().address,
          zip: ad.data().zip,
          city: ad.data().city,
          pictures: ad.data().pictures,
        };
      }
      return null;
    });
    const adResults = await Promise.all(adPromises);
    userAds.push(...adResults.filter((ad) => ad !== null));
  }
  return userAds;
};

// UPDATE 
// UPDATE A USER
export const updateUser = async (id: string, userData: GoogleUser) => {
  const document = doc(firestore, `users/${id}`);
  await updateDoc(document, { ...userData });
};


// UPDATE A ADD
export const updateAd = async (adId: string, adData: UpdateAd) => {
  const document = doc(firestore, `ads/${adId}`);
  await updateDoc(document, { ...adData });
};

// Delete review
export const deleteReview = async (id: string) => {
  const document = doc(firestore, `reviews/${id}`);
  await deleteDoc(document);
};

// Delete user's ads collection
export const deleteUserAdsCollection = async (id: string) => {
  const userRef = doc(firestore, `users/${id}`);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists() && userSnap.data()?.myAds) {
    const myAds = userSnap.data().myAds;
    await Promise.all(myAds.map(async (adId: string) => {
      await deleteAd(adId);
    }));
    const myAds2: Ad[] = [];
    await updateDoc(userRef, { myAds: myAds2 });
  }
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    await deleteUserAdsCollection(id);
    const userRef = doc(firestore, `users/${id}`);
    await deleteDoc(userRef);
  } catch (error) {
    console.error(`Error deleting user with ID: ${id}`, error);
  }
};

//get ad reviews
export async function getAdReviews(adId: string) {
  const reviews: Review[] = [];
  const reviewSnapshot = await getDocs(collection(firestore, "reviews"));
  const updatedReviews = [];
  for (const doc of reviewSnapshot.docs) {
    if (doc.data().adId === adId) {
      const review = {
        id: doc.id,
        adId: doc.data().adId,
        userId: doc.data().userId,
        rating: doc.data().rating,
        comment: doc.data().comment,
      };
      if (doc.exists()) {
        updatedReviews.push(review);
      }
      reviews.push(review);
    }
  }
  if (updatedReviews.length !== reviews.length) {
    // some reviews were deleted, update the ad document
    const adToBeUpdated = await getAd(adId);
    if (adToBeUpdated === null) {
      throw new Error(`Ad with ID ${adId} does not exist`);
    }
    await updateAd(adId, {
      id: adId,
      userid: reviews[0].userId,
      title: adToBeUpdated.data().title,
      description: adToBeUpdated.data().description,
      category: adToBeUpdated.data().category,
      price: adToBeUpdated.data().price,
      address: adToBeUpdated.data().address,
      zip: adToBeUpdated.data().zip,
      city: adToBeUpdated.data().city,
      pictures: adToBeUpdated.data().pictures,
      reviews: updatedReviews.map((r) => r.id),
    });
  }
  return reviews;
}

// get booked dates for ad
export async function getAdBookedDates(adId: string) {
  const bookedDates: BookedDate[] = [];
  const bookedDateSnapshot = await getDocs(collection(firestore, "bookedDates"));
  bookedDateSnapshot.forEach((doc) => {
    if (doc.data().adId === adId) {
      bookedDates.push({
        id: doc.id,
        userId: doc.data().userId,
        adId: doc.data().adId,
        date: doc.data().date,
      });
    }
  })
  return bookedDates;
}

//get ad rating
export async function getAdRating(adId: string) {
  let ratingSum: number = 0;
  let ratingCount: number = 0;

  const reviewSnapshot = await getDocs(collection(firestore, "reviews"));
  reviewSnapshot.forEach((doc) => {
    if (doc.data().adId === adId) {
      ratingCount += 1;
      ratingSum += doc.data().rating;
    }
  })

  return ratingSum / ratingCount;
}

// get number of reviews
export async function getNumReviews(adId: string) {
  let sum: number = 0;

  const reviewSnapshot = await getDocs(collection(firestore, "reviews"));
  reviewSnapshot.forEach((doc) => {
    if (doc.data().adId === adId) {
      sum += 1;
    }
  })

  return sum;
}


export async function getReview(reviewId: string) {
  const document = doc(firestore, `reviews/${reviewId}`);
  const review = await getDoc(document);
  return review;
}


export async function getMyReviews(userId: string) {
  // get reviewId from user's myReviews array
  const reviews: Review[] = [];
  const user = await getUser(userId);
  if (user.exists() && user.data().myReviews) {
    const myReviews = user.data().myReviews;
    const updatedMyReviews = [];
    for (const reviewId of myReviews) {
      const review = await getReview(reviewId);
      if (review.exists()) {
        updatedMyReviews.push(reviewId);
        reviews.push({
          id: review.id,
          adId: review.data().adId,
          userId: review.data().userId,
          rating: review.data().rating,
          comment: review.data().comment,
        });
      }
    }
    if (updatedMyReviews.length !== myReviews.length) {
      await updateUser(userId, {
        id: userId,
        myReviews: updatedMyReviews,
      });
    }
  }
  return reviews;
}

// DELETE AN AD
export const deleteAd = async (adId: string) => {
  try {
    // delete reviews 
    const reviews = await getAdReviews(adId);
    const reviewPromises = reviews.map(async (review) => {
      const reviewRef = doc(firestore, `reviews/${review.id}`);
      await deleteDoc(reviewRef);
    });
    await Promise.all(reviewPromises);
    // delete ad from user's myAds array
    const ad = await getAd(adId);
    if (ad !== null && ad.exists()) {
      const user = await getUser(ad.data().userid);
      if (user.exists() && user.data().myAds) {
        const myAds = user.data().myAds;
        const index = myAds.indexOf(adId);
        if (index > -1) {
          myAds.splice(index, 1);
        }
        await updateDoc(user.ref, { myAds });
      }
    }
    const adRef = doc(firestore, `ads/${adId}`);
    await deleteDoc(adRef);
  } catch (error) {
    console.error(`Error deleting ad with ID: ${adId}`, error);
  }
};


export const uploadImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}


export const uploadImages = async (files: FileList): Promise<string[]> => {
  try {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      urls.push(url);
    }
    return urls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}


// HELP FUNCTIONS FOR SAVED ADS

// check if ad is owned by user
export async function isOwned(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const myAds = userSnap.data()?.myAds || [];
  return myAds.includes(adId);
}

// boolean function: check if ad is saved by user
export async function isSaved(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  return savedAds.includes(adId);
}

// remove ad from savedAds collection in user document
export async function removeAdFromUser(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  if (savedAds.includes(adId)) {
    const index = savedAds.indexOf(adId);
    savedAds.splice(index, 1);
    await updateDoc(userRef, { savedAds });
  }
}


// save ad to savedAds collection in user document
export async function saveAdToUser(userId: string, adId: string) {
  const userRef = doc(firestore, `users/${userId}`);
  const userSnap = await getDoc(userRef);
  const savedAds = userSnap.data()?.savedAds || [];
  if (!savedAds.includes(adId)) {
    savedAds.push(adId);
    await updateDoc(userRef, { savedAds });
  }
}

// get all saved ads for user
// Get all ads from a specific user

export const getSavedAdsFromUser = async (id: string): Promise<Ad[]> => {
  const user = await getUser(id);
  const userAds: Ad[] = [];

  if (user.exists() && user.data().savedAds) {
    const savedAds = user.data().savedAds;
    const adPromises = savedAds.map(async (adId: string) => {
      const ad = await getAd(adId);
      if (ad !== null && ad.exists()) {
        return {
          id: ad.id,
          userid: ad.data().userid,
          title: ad.data().title,
          description: ad.data().description,
          category: ad.data().category,
          price: ad.data().price,
          address: ad.data().address,
          zip: ad.data().zip,
          city: ad.data().city,
          pictures: ad.data().pictures,
        };
      } else {
        // remove ad from savedAds array
        await removeAdFromUser(id, adId);
      }
      return null;
    });
    const adResults = await Promise.all(adPromises);
    userAds.push(...adResults.filter((ad) => ad !== null));
  }

  return userAds;
};