export interface Ad {
    id: string;
    userid?: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    address?: string;
    zip?: number;
    city?: string;
    pictures?: string[];
    reviews?: string[];
    review?: number;
    bookedDates?: string[];
}

export interface UpdateAd {
    id?: string;
    userid?: string;
    title: string;
    description: string;
    category: string;
    price: number;
    address: string;
    zip: number;
    city: string;
    pictures: string[];
    reviews: string[];
}
export interface UpdateBookedDates {
    bookedDates?: string[];
}

export interface NewAd {
    id?: string;
    userid?: string;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    address?: string;
    zip?: number;
    city?: string;
    pictures?: string[];
    reviews?: string[];
}

export interface Review {
    id: string;
    userId?: string;
    adId?: string;
    rating?: number;
    comment?: string;
}

export interface NewReview {
    id?: string;
    userId: string;
    adId: string;
    rating?: number;
    comment?: string;
}

export interface BookedDate {
    id: string;
    userId?: string;
    adId?: string;
    date?: string;
}

export interface NewBookedDates {
    id?: string;
    userId: string;
    adId: string;
    date?: string;
}

export interface Reservation {
    id: string;
    userId?: string;
    adId?: string;
    startDate?: string;
    endDate?: string;
}

export interface NewReservation {
    id?: string;
    userId?: string;
    adId?: string;
    startDate?: string;
    endDate?: string;
}

export interface NewGoogleUser {
    uid: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    myAds?: string[];
    savedAds?: string[];
    myReviews?: string[];
}

export interface GoogleUser {
    id: string;
    uid?: string;
    phoneNumber?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    email?: string | null;
    myAds?: string[];
    savedAds?: string[];
    myReviews?: string[];
}
