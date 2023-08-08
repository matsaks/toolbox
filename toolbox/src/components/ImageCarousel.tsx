import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import styles from '../styles/Home.module.scss'


export default function ImageCarousel() {

    return (
        <div className={styles.container}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                speed={500}
                slidesPerView={1}
                loop
                className={styles.swiper1}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <img src="https://images.unsplash.com/photo-1675966356873-06f6eedffeb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3431&q=80" alt="mountains" />
                </SwiperSlide>

                <SwiperSlide className={styles.swiperSlide}>
                    <img src="https://images.unsplash.com/photo-1675887057159-40fca28fdc5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80" alt="mountains2" />
                </SwiperSlide>

                <SwiperSlide className={styles.swiperSlide}>
                    <img src="https://images.unsplash.com/photo-1634304251039-937f7a4e9cc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3538&q=80" alt="mountains3" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}


