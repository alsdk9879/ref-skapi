<template lang="pug">
div._root(style='min-height: calc(100vh - var(--footer-height, 0));')
    router-view(v-if='connected')

Footer

#code-copy-msg The code copied!
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import { connected } from "@/main";

import Footer from "@/components/footer.vue";

const router = useRouter();
const route = useRoute();
</script>
<style lang="less">
#code-copy-msg {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

    &.show {
        transform: translateX(-50%) translateY(-100px);
        opacity: 1;
    }
}

.review-swiper {
    .swiper {
        padding-bottom: 8rem;
    }

    .swiper-pagination {
        width: unset !important;
        bottom: unset !important;
        top: 39.5rem !important;
    }

    .swiper-pagination-bullet {
        background: #3f3f3f;

        &:hover {
            background: #999;
        }
    }

    .swiper-pagination-bullet-active {
        background: #fff;
    }
}

.plan-swiper {
    .swiper-pagination-bullet {
        width: unset;
        height: unset;
        flex-grow: 1;
        flex-basis: 100px;
        background-color: unset;
        border: 1px solid #000;
        border-radius: 40px;
        padding: 14px 0;
        margin: 0 !important;
        font-size: 20px;
        font-weight: 500;
        opacity: 1;
        color: #000;

        &.on {
            background-color: #000;
            color: #fff;

            &:hover {
                background-color: #000;
            }
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
    }

    .swiper-wrapper {
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px 0;
    }
}

.service-swiper {

    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-horizontal>.swiper-pagination-bullets,
    .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: 1.25rem;
        top: initial;
        left: 1.5625rem;
        width: fit-content;
    }

    .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,
    .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 0.1875rem;
    }

    .swiper-pagination-bullet {
        opacity: 0.3;
        width: 0.5rem;
        height: 0.5rem;
    }

    .swiper-pagination-bullet-active {
        opacity: 0.8 !important;
        background: #000;
    }
}

@media (max-width: 800px) {
    .review-swiper {
        .swiper {
            padding-bottom: 6rem;
        }

        .swiper-pagination {
            left: 50% !important;
            top: var(--swiper-pagination-translate-y, 0) !important;
            transform: translateX(-50%) !important;
        }
    }

    .plan-swiper {
        .swiper-wrapper {
            flex-wrap: unset;
            justify-content: unset;
            gap: unset;
        }
    }
}

@media (max-width: 480px) {
    .review-swiper {
        .swiper {
            padding-bottom: 0;
        }
    }

    .plan-swiper {
        .swiper-pagination-bullet {
            font-size: 15px;
            padding: 10px 0;
        }
    }
}
</style>
