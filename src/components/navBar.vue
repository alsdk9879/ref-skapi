<template lang="pug">
nav#navBar(ref="navBar" :class="{ 'main-nav': routeName === 'home' }")
    .wrap
        .left
            template(v-if="route.name != 'home'")
                .logo-wrap
                    router-link.logo(to="/")
                        img.symbol(src="@/assets/img/logo/icon_logo_symbol.svg")
                    router-link.myservice(to="/my-services")
                        img.symbol(src="@/assets/img/logo/icon_logo_text_myservices.svg")
            template(v-else)
                router-link.logo(to="/")
                    img.symbol(src="@/assets/img/logo/icon_logo.svg")
                ul.section-list(v-if="route.name === 'home'" ref="navSecEl")
                    li.section-item(@click="scrollSec('section1')") Features
                    li.section-item(@click="scrollSec('section2')") Price
                    li.section-item(@click="scrollSec('section3')") FAQ
                    li.section-item(@click="scrollSec('section4')") Contents

        .right
            ul.menu-wrap(ref="navMenuEl")
                template(v-if="isDesktop")
                    template(v-if="user?.user_id")
                        li.list.go-community(ref="communityEl")
                            .dropdown-container(@mouseenter="showDropdown" @mouseleave="hideDropdown")
                                .ser.dropdown Community
                                    img(src="@/assets/img/landingpage/icon_dropdown.svg" style="width: .6875rem; height: 1.5rem;")
                                .moreVert.community(ref="moreVert" :style="{ '--moreVert-right': 0, display: communityDropdownVisible ? 'block' : 'none' }")
                                    ul.list-wrap
                                        li.item
                                            a.link(href="http://www.tiktok.com/@skapi_api" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_tiktok.svg")
                                        li.item
                                            a.link(href="https://www.instagram.com/skapi_api" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_instagram.svg")
                                        li.item
                                            a.link(href="https://www.youtube.com/@skapi_official" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_youtube.svg")
                                        li.item
                                            a.link(href="https://x.com/skapi_api" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_x.svg")
                                        li.item
                                            a.link(href="https://www.linkedin.com/company/skapi-backend-api/" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_linkedin.svg")
                                        li.item
                                            a.link(href="https://www.facebook.com/profile.php?id=61577236221327" target="_blank")
                                                img(src="@/assets/img/landingpage/icon_facebook.svg")
                        li.list.go-docs
                            a.ser(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") 
                                img(src="@/assets/img/landingpage/icon_docs.svg")
                                | Docs
                        li.list.go-github
                            a.ser(href="https://github.com/broadwayinc/skapi-js" target="_blank")
                                img(src="@/assets/img/landingpage/icon_github.svg")
                                | Github
                        li.list.go-service(v-if="route.name === 'home'")
                            router-link.ser(to="/my-services") 
                                img(src="@/assets/img/logo/symbol-logo-white.svg")
                                | My Services
                        li.list.user-profile(@click.stop="(e)=>{showDropDown(e)}")
                            .img-profile-wrap
                                img(src="@/assets/img/landingpage/icon_profile.svg")
                            .moreVert.profile(ref="moreVert" @click.stop style="--moreVert-right:0;display:none")
                                .account 
                                    span.user-id {{ userEmail.split("@")[0] }}
                                    | @{{ userEmail.split("@")[1] }}
                                ul.dropdown-menu
                                    li.dropdown-list(@click="openBillingPage")
                                        img(src="@/assets/img/landingpage/icon_billing.svg")
                                        span Billing
                                    li.dropdown-list(@click="navigateToPage")
                                        img(src="@/assets/img/landingpage/icon_setting.svg")
                                        span Account Settings
                                    li.dropdown-list(@click="logout")
                                        img(src="@/assets/img/landingpage/icon_logout.svg")
                                        span Logout
                    template(v-else)
                        li.list.go-community(ref="communityEl")
                            .dropdown-container(@mouseenter="showDropdown" @mouseleave="hideDropdown")
                                .ser.dropdown Community
                                    img(src="@/assets/img/landingpage/icon_dropdown.svg" style="width: .6875rem; height: 1.5rem;")
                                    .moreVert.community(ref="moreVert" :style="{ '--moreVert-right': 0, display: communityDropdownVisible ? 'block' : 'none' }")
                                        ul.list-wrap
                                            li.item
                                                a.link(href="http://www.tiktok.com/@skapi_api" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_tiktok.svg")
                                            li.item
                                                a.link(href="https://www.instagram.com/skapi_api" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_instagram.svg")
                                            li.item
                                                a.link(href="https://www.youtube.com/@skapi_official" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_youtube.svg")
                                            li.item
                                                a.link(href="https://x.com/skapi_api" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_x.svg")
                                            li.item
                                                a.link(href="https://www.linkedin.com/company/skapi-backend-api/" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_linkedin.svg")
                                            li.item
                                                a.link(href="https://www.facebook.com/profile.php?id=61577236221327" target="_blank")
                                                    img(src="@/assets/img/landingpage/icon_facebook.svg")
                        li.list.go-docs
                            a.ser(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") 
                                img(src="@/assets/img/landingpage/icon_docs.svg")
                                | Docs
                        li.list.go-github
                            a.ser(href="https://github.com/broadwayinc/skapi-js" target="_blank") 
                                img(src="@/assets/img/landingpage/icon_github.svg")
                                | Github
                        li.list.go-login
                            router-link(to="/login") 
                                img(src="@/assets/img/landingpage/icon_login.svg")
                                | Login

                template(v-else :class="{ 'mo' : true }")
                    button.btn-open-menu.nohover(@click="openMoMenu")
                        img(src="@/assets/img/landingpage/icon_menubar.svg")
                    .mo-menu-wrap
                        .top-area
                            .logo
                                img.symbol.mobile(src="@/assets/img/logo/icon_logo.svg" @click="router.push('/')")
                            .right-area
                                .prof
                                    template(v-if="user?.user_id" )
                                        .img-profile(@click.stop="(e)=>{showDropDown(e)}")
                                            .img-wrap
                                                img(src="@/assets/img/landingpage/icon_profile.svg" style="width: 2.5rem; height: 2.5rem;")
                                            .moreVert.profile(ref="moreVert" @click.stop style="--moreVert-right:0;display:none")
                                                .account 
                                                    span.user-id {{ userEmail.split("@")[0] }}
                                                    | @{{ userEmail.split("@")[1] }}
                                                ul.dropdown-menu
                                                    li.dropdown-list(@click="openBillingPage")
                                                        img(src="@/assets/img/landingpage/icon_billing.svg")
                                                        span Billing
                                                    li.dropdown-list(@click="navigateToPage")
                                                        img(src="@/assets/img/landingpage/icon_setting.svg")
                                                        span Account Settings
                                                    li.dropdown-list(@click="logout")
                                                        img(src="@/assets/img/landingpage/icon_logout.svg")
                                                        span Logout
                                    template(v-else)
                                        router-link.go-login(to="/login" @click="closeMobileMenu") 
                                            img(src="@/assets/img/landingpage/icon_login.svg")
                                            | Login
                                button.btn-close.nohover(@click="openMoMenu")
                                    img(src="@/assets/img/landingpage/icon_close.svg")

                        ul.section-list(v-if="route.name === 'home'")
                            li.section-item(@click="scrollSec('section1')") Features
                            li.section-item(@click="scrollSec('section2')") Price
                            li.section-item(@click="scrollSec('section3')") FAQ
                            li.section-item(@click="scrollSec('section4')") Contents
                        SideNav(v-if="currentRoutePath === 'my-services' && serviceMainLoaded" @closeMobileMenu="closeMobileMenu")
                        ul.menu-list
                            li.list.go-docs.mo-item
                                a.ser(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank" @click="closeMobileMenu") 
                                    img(src="@/assets/img/landingpage/icon_docs.svg")
                                    | Docs
                            li.list.go-github.mo-item
                                a.ser(href="https://github.com/broadwayinc/skapi-js" target="_blank" @click="closeMobileMenu")
                                    img(src="@/assets/img/landingpage/icon_github.svg")
                                    | Github
                            li.list.go-service.mo-item(v-if="user?.user_id")
                                router-link.ser(to="/my-services" @click="closeMobileMenu") 
                                    img(src="@/assets/img/logo/symbol-logo-white.svg")
                                    | My Services
                        .community(:class="{'absolute': currentRoutePath !== 'my-services'}")
                            span.text Community
                            ul.list-wrap
                                li.item
                                    a.link(href="http://www.tiktok.com/@skapi_api" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_tiktok.svg")
                                li.item
                                    a.link(href="https://www.instagram.com/skapi_api" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_instagram.svg")
                                li.item
                                    a.link(href="https://www.youtube.com/@skapi_official" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_youtube.svg")
                                li.item
                                    a.link(href="https://x.com/skapi_api" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_x.svg")
                                li.item
                                    a.link(href="https://www.linkedin.com/company/skapi-backend-api/" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_linkedin.svg")
                                li.item
                                    a.link(href="https://www.facebook.com/profile.php?id=61577236221327" target="_blank")
                                        img(src="@/assets/img/landingpage/icon_facebook.svg")
#proceeding(v-if="running")
    .inner    
        .loader(style="--loader-color:black; --loader-size: 20px")
        h4 Page Loading
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { skapi } from "@/main";
import { serviceMainLoaded, currentService } from "@/views/service/main";
import { user, customer } from "@/code/user";
import { showDropDown } from "@/assets/js/event.js";
import { setAutoHide, removeListener, routeName } from "./navBar-autohide.ts";

import SideNav from "@/components/sideNav.vue";

const router = useRouter();
const route = useRoute();

let navBar = ref(null);
let moreVert = ref(null);
let running = ref(false);
let serviceName = ref(currentService?.service?.name || "");
const userEmail = ref(user?.email || "");
const isDesktop = ref(window.innerWidth > 800);

const navSecEl = ref(null);
const navMenuEl = ref(null);
const communityEl = ref(null);
const communityDropdownVisible = ref(false);
let currentRoutePath = ref("");
let hideTimeout = null;

const updateServiceName = () => {
    serviceName.value = currentService?.service?.name || "loading...";
};

let openBillingPage = async () => {
    running.value = true;

    let resolvedCustomer = await customer;

    skapi
        .clientSecretRequest({
            clientSecretName: "stripe_test",
            url: `https://api.stripe.com/v1/billing_portal/sessions`,
            method: "POST",
            headers: {
                Authorization: "Bearer $CLIENT_SECRET",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
                customer: resolvedCustomer.id,
                return_url: window.location.origin + route.path,
            },
        })
        .then((response) => {
            window.location = response.url;
            setTimeout(function () {
                running.value = false;
            }, 3000);
        });
};

let navigateToPage = () => {
    moreVert.value.style.display = "none";

    const moMenuWrap = document.querySelector(".right");
    const body = document.querySelector("body");

    if (moMenuWrap.classList.contains("open")) {
        moMenuWrap.classList.remove("open");
        body.style.overflow = "auto";
    }

    router.push({ path: "/account-setting" });
};

let logout = () => {
    skapi.logout().then(() => {
        router.push({ path: "/" });
    });
};

const openMoMenu = () => {
    const moMenuWrap = document.querySelector(".right");
    const body = document.querySelector("body");

    moMenuWrap.classList.toggle("open");
    body.style.overflow = moMenuWrap.classList.contains("open")
        ? "hidden"
        : "auto";
};

const closeMobileMenu = () => {
    const moMenuWrap = document.querySelector(".right");
    const body = document.querySelector("body");

    if (moMenuWrap && moMenuWrap.classList.contains("open")) {
        moMenuWrap.classList.remove("open");
        body.style.overflow = "auto";
    }
};

const scrollSec = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const remOffset =
            4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        const scrollY = section.offsetTop - remOffset;
        window.scrollTo({ top: scrollY, behavior: "smooth" });
    }

    closeMobileMenu();
};

function handleMouseOver(container, selector, event) {
    const hovered = event.target.closest(selector);
    if (hovered) {
        if (
            hovered.classList.contains("go-login") ||
            hovered.classList.contains("user-profile") ||
            hovered.classList.contains("mo-item")
        ) {
            const elements = container.querySelectorAll(selector);
            elements.forEach((el) => (el.style.opacity = 1));
            return;
        }

        // 일반 리스트 hover 처리
        const elements = container.querySelectorAll(selector);
        elements.forEach((el) => {
            if (
                el.classList.contains("go-login") ||
                el.classList.contains("user-profile") ||
                el.classList.contains("mo-item")
            ) {
                el.style.opacity = 1;
            } else {
                el.style.opacity = 0.5;
            }
        });
        hovered.style.opacity = 1;
    }
}

function handleMouseOut(container, selector, event) {
    const currentTarget = event.currentTarget;
    const related = event.relatedTarget;

    if (currentTarget && related && currentTarget.contains(related)) {
        return; // 컨테이너 내부 이동 → 무시
    }

    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => (el.style.opacity = 1));
}

// community dropdown
const showDropdown = () => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
    communityDropdownVisible.value = true;
};

const hideDropdown = () => {
    // 약간의 지연을 두어 사용자가 popup으로 마우스를 이동할 시간을 제공
    hideTimeout = setTimeout(() => {
        communityDropdownVisible.value = false;
    }, 100);
};

window.addEventListener("resize", () => {
    isDesktop.value = window.innerWidth > 800;
});

onMounted(() => {
    setAutoHide(navBar.value, 3);
    window.addEventListener("serviceChanged", updateServiceName);

    if (navSecEl.value) {
        navSecEl.value.addEventListener("mouseover", (e) =>
            handleMouseOver(navSecEl.value, ".section-item", e)
        );
        navSecEl.value.addEventListener("mouseout", (e) =>
            handleMouseOut(navSecEl.value, ".section-item", e)
        );
    }

    if (navMenuEl.value) {
        navMenuEl.value.addEventListener("mouseover", (e) =>
            handleMouseOver(navMenuEl.value, ".list", e)
        );
        navMenuEl.value.addEventListener("mouseout", (e) =>
            handleMouseOut(navMenuEl.value, ".list", e)
        );
    }

    if (communityEl.value) {
        communityEl.value.addEventListener("mouseover", (e) =>
            handleMouseOver(communityEl.value, ".link", e)
        );
        communityEl.value.addEventListener("mouseout", (e) =>
            handleMouseOut(communityEl.value, ".link", e)
        );
    }
});

onBeforeUnmount(() => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }

    removeListener();
    window.removeEventListener("serviceChanged", updateServiceName);

    if (navSecEl.value) {
        navSecEl.value.removeEventListener("mouseover", (e) =>
            handleMouseOver(navSecEl.value, ".section-item", e)
        );
        navSecEl.value.removeEventListener("mouseout", (e) =>
            handleMouseOut(navSecEl.value, ".section-item", e)
        );
    }

    if (navMenuEl.value) {
        navMenuEl.value.removeEventListener("mouseover", (e) =>
            handleMouseOver(navMenuEl.value, ".list", e)
        );
        navMenuEl.value.removeEventListener("mouseout", (e) =>
            handleMouseOut(navMenuEl.value, ".list", e)
        );
    }

    if (communityEl.value) {
        communityEl.value.removeEventListener("mouseover", (e) =>
            handleMouseOver(communityEl.value, ".link", e)
        );
        communityEl.value.removeEventListener("mouseout", (e) =>
            handleMouseOut(communityEl.value, ".link", e)
        );
    }
});

watch(
    () => route.name,
    (nv, ov) => {
        if (nv) {
            routeName.value = typeof nv === "string" ? nv : "";
        }
    },
    { immediate: true }
);

watch(
    () => route.path,
    (nv) => {
        let splitPath = nv.split("/");

        currentRoutePath.value = splitPath.length > 2 ? splitPath[1] : "";
    },
    { immediate: true }
);
</script>

<style lang="less" scoped>
img.symbol.mobile {
    display: none;
}

#proceeding {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
}

#navBar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 4rem;
    background-color: #000;
    font-size: 1.125rem;
    color: #fff;
    fill: #fff; // for svg

    a {
        color: #fff;
    }

    &.main-nav {
        .wrap {
            max-width: 100rem;
        }
    }

    .wrap {
        // max-width: 100rem;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0 2.5rem;
        margin: 0 auto;

        .left {
            flex-grow: 1;
            display: flex;
            align-items: center;
            gap: 3.75rem;
            height: 100%;

            .logo-wrap {
                display: flex;
                align-items: center;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
            }

            .logo {
                display: flex;
                gap: 10px;
                color: #000;
                text-decoration: none;
            }

            .section-list {
                display: flex;
                align-items: center;
                padding-left: 0;
                margin: 0;
                height: 100%;

                .section-item {
                    list-style: none;
                    cursor: pointer;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    padding-right: 2.75rem;

                    &:last-child {
                        padding-right: 0;
                    }
                }
            }
        }

        .right {
            display: inline-block;
            vertical-align: middle;
            height: 100%;

            .menu-wrap {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding-left: 0;
                margin: 0;
                height: 100%;

                li {
                    list-style: none;
                    vertical-align: middle;
                    user-select: none;
                    position: relative;
                    height: 100%;
                }
            }

            .list {
                &:first-child {
                    .ser {
                        padding-left: 0;
                    }
                }

                &::after {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 20px;
                    background-color: rgba(225, 225, 225, 0.2);
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }

                &.user-profile {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding-right: 0;
                    padding-left: 1.25rem;
                    position: relative;

                    .img-profile-wrap {
                        overflow: hidden;
                        position: relative;

                        &:hover {
                            &::after {
                                content: "";
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(255, 255, 255, 0.05);
                                position: absolute;
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                                z-index: 1;
                                border-radius: 50%;
                            }
                        }
                    }

                    img {
                        display: block;
                        overflow: hidden;
                    }

                    &::after {
                        display: none;
                    }
                }
            }

            .ser {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                height: 100%;
                padding: 0 1.25rem;

                &:hover {
                    text-decoration: none;
                }

                img {
                    width: 1.25rem;
                    height: 1.25rem;
                }
            }

            .go-community {
                .btn-dropdown {
                    background: none;
                    border: none;
                    padding: 0;
                    margin: 0;
                    font: inherit;
                    color: inherit;
                    height: auto;
                }

                .item {
                    cursor: pointer;
                }
            }

            .go-login {
                border-radius: 100px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                margin-left: 1.25rem;
                height: initial !important;

                a {
                    padding: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    height: 100%;
                    padding: 0.5rem 1.125rem 0.5rem 1rem;

                    &:hover {
                        text-decoration: none;
                    }
                }

                &:after {
                    content: none;
                }

                &:hover {
                    background-color: #1c1b1b;
                }
            }
        }

        .profile {
            max-width: 19.375rem;
            text-align: left;
            color: #fff;
            font-size: 1rem;
            font-weight: 400;
            user-select: none;
            background-color: #16171a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.875rem;

            .account {
                padding: 14px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
            }

            .user-id {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .dropdown-menu {
            display: block;
            text-align: left;
            padding: 0.625rem 0 1.25rem;

            .dropdown-list {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.625rem 1.25rem;

                span {
                    font-size: 1.0625rem;
                    font-weight: 500;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.05);
                    cursor: pointer;
                }
            }
        }

        .community {
            background-color: #16171a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.875rem;

            .list-wrap {
                padding: 1rem 1.25rem;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                // gap: 0.75rem 0;
            }

            .item {
                display: flex;
                justify-content: center;
                align-items: center;

                .link {
                    display: inline-block;
                    padding: 0.375rem;
                }

                img {
                    width: 2.25rem;
                    height: 2.25rem;
                }

                &.mo-item {
                    .link {
                        padding: 0.25rem 1rem 0.25rem 0;
                    }
                }
            }
        }
    }

    .go-community {
        .dropdown-container {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .moreVert.community {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000;
            /* 기존 moreVert 스타일 유지 */
        }
    }
}

@media (max-width: 1199px) {
    #navBar {
        .wrap {
            .left {
                .section-list {
                    display: none;
                }
            }
        }
    }
}

@media (max-width: 800px) {
    #navBar {
        .wrap {
            padding: 0 1.25rem;

            .left {
                .section-list {
                    display: none;
                }
            }

            .right {
                .mo {
                    padding-right: 0;

                    &:after {
                        content: none;
                    }
                }

                .btn-open-menu {
                    background: none;
                    border: none;
                    padding: 0;
                    margin: 0;
                    font: inherit;
                    color: inherit;
                    height: 100%;

                    img {
                        width: 2rem;
                        height: 2rem;
                    }
                }

                &.open {
                    .mo-menu-wrap {
                        right: 0;
                    }
                }
            }

            .community {
                border: none;
                background-color: inherit;
                border-radius: 0;
                padding: 1.25rem 1.25rem 0.75rem 1.25rem;

                &.absolute {
                    position: absolute;
                    width: calc(100% - 4.5rem);
                    bottom: 60px;
                }

                .text {
                    font-size: 0.875rem;
                    font-weight: 400;
                    color: rgba(225, 225, 225, 0.7);
                    display: inline-block;
                    margin-bottom: 1.25rem;
                }

                .list-wrap {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 0;
                }

                .item {
                    padding: 0;
                }
            }
        }

        .mo-menu-wrap {
            position: absolute;
            right: -110%;
            top: 0;
            width: 100%;
            height: 100vh;
            background: #000;
            padding-bottom: 3.75rem;
            transition: right 0.3s ease-in-out;
            z-index: 9999;
            overflow-y: auto;

            .top-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 4rem;
                padding: 0 1.25rem;

                img.symbol.mobile {
                    display: block;
                }
            }

            .right-area {
                display: flex;
                align-items: center;
                height: 100%;
                gap: 1.25rem;

                .prof {
                    display: flex;
                    cursor: pointer;
                    top: 0.25rem;
                }

                .img-profile {
                    .img-wrap {
                        position: relative;
                        overflow: hidden;

                        img {
                            display: block;
                        }

                        &:hover {
                            &::after {
                                content: "";
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                background-color: rgba(255, 255, 255, 0.05);
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                                z-index: 1;
                                border-radius: 50%;
                            }
                        }
                    }
                }

                .profile {
                    top: 4rem;
                    right: 1.25rem;
                }

                .go-login {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1.125rem 0.5rem 1rem;

                    &:hover {
                        text-decoration: none;
                    }

                    img {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                }
            }

            .btn-close {
                background: none;
                border: none;
                padding: 0;
                margin: 0;
                font: inherit;
                color: inherit;
                height: 100%;
                display: flex;
                align-items: center;

                img {
                    width: 2rem;
                    height: 2rem;
                }
            }

            ul {
                height: initial;
                font-size: 1rem;
                font-weight: 400;
                padding-left: 0;
            }

            li {
                padding: 0.75rem 2.25rem;
            }

            .section-list {
                &:after {
                    content: "";
                    display: inline-block;
                    width: calc(100% - 3rem);
                    height: 1px;
                    background-color: rgba(255, 255, 255, 0.1);
                    position: relative;
                    bottom: -0.375rem;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }

            .menu-list {
                padding-top: 1.25rem;
                padding-bottom: 1.25rem;

                .list {
                    padding: 0;
                    font-size: 1rem;

                    &:first-child {
                        .ser {
                            // padding-left: 1.5rem;
                            padding-left: 2.25rem;
                        }
                    }

                    &::after {
                        content: none;
                    }

                    &:hover {
                        background: rgba(255, 255, 255, 0.05);
                        cursor: pointer;
                    }

                    a {
                        padding: 0.75rem 2.25rem;
                    }
                }

                .ser {
                    padding: 1rem 1.5rem;
                }

                .go-github {
                    padding-left: 0;
                }
            }

            .community {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.75rem 0;
                margin: 0 2.25rem;

                .list-wrap {
                    li {
                        &:first-child {
                            a {
                                padding-left: 0;
                            }
                        }
                    }

                    .item {
                        margin-right: 12px;

                        .link {
                            padding: 0;
                        }
                    }
                }
            }

            .mo-item {
                &:hover {
                    background: transparent;
                }
            }
        }
    }
}

@media (max-width: 430px) {
    #navBar {
        .mo-menu-wrap {
            .right-area {
                .profile {
                    max-width: calc(100% - 2rem);
                }

                .dropdown-list {
                    img {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                }

                .go-login {
                    font-size: 1.0625rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    &:hover {
                        text-decoration: none;
                    }

                    img {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                }
            }

            .menu-list {
                .list {
                    &:first-child {
                        .ser {
                            padding-left: 2rem;
                        }
                    }

                    a {
                        padding: 0.75rem 2rem;
                    }
                }
            }

            .community {
                padding: 0.75rem 0;
            }

            li {
                padding-left: 2rem;
            }
        }
    }
}
</style>
