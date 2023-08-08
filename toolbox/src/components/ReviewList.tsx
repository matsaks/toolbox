import { Review, GoogleUser } from "../types/types";
import ReviewComponent from "./ReviewComponent";

interface Props {
    reviews: Review[];
    users: GoogleUser[];
}

function ReviewList(props: Props) {

    return (
        <div className="">
            <div className=" flex flex-col overflow-y-auto max-h-96">
                <div className=' w-full text-current justify-center flex-col '>
                    {props.reviews.map((review, index) => (
                        <ReviewComponent user={props.users[index]} adId={review.adId} rating={review.rating} comment={review.comment} key={`${review.adId}+${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewList;



