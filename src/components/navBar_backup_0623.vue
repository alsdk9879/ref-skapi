<template lang="pug">
nav#navBar(ref="navBar")
    .wrap
        .left
            template(v-if="route.name != 'home' && user?.user_id && route.path !== '/my-services' && route.path !== '/account-setting'")
                img.symbol(src="@/assets/img/logo/symbol-logo.png" @click="router.push('/')")
                .router
                    span.small(@click="router.push('/my-services')") My Services/
                    p.big {{ serviceName }}
            router-link.logo(to="/" v-else)
                img.symbol(src="@/assets/img/logo/symbol-logo.png" @click="router.push('/')")
                span.faktum.desktop(style="font-size:1.4rem;") skapi
        .right
            ul.menu-wrap
                template(v-if="user?.user_id")
                    li.go-github
                        a(href="https://github.com/broadwayinc/skapi-js" target="_blank")
                            img(src="@/assets/img/icon/icon_github.svg" style="filter: invert(1);")
                    li
                        a.ser(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") Docs
                        
                    li(v-if="route.name == 'home'")
                        router-link(to="/my-services") My Services
                    //- li(v-else="route.name != 'home'")
                    //-     a.doc(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank" style="color:white")
                    //-         //- .material-symbols-outlined.notranslate menu_book
                    //-         svg(width="24" height="24" style="fill:white")
                    //-             //- use(xlink:href="@/assets/img/material-icon.svg#icon-menu-book")
                    //-         | &nbsp;Docs

                    li
                        .prof(@click.stop="(e)=>{showDropDown(e)}")
                            //- .material-symbols-outlined.notranslate.notranslate.fill(style="margin: 0 .5rem 0 1rem;font-size:32px;") account_circle
                            svg(width="32" height="32")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-account-circle-fill")
                            .moreVert.profile(ref="moreVert" @click.stop style="--moreVert-right:0;display:none")
                                .inner(style="padding:0")
                                    .account {{ user.email }}
                                    ul.menu
                                        li(@click="openBillingPage")
                                            //- .material-symbols-outlined.notranslate credit_card
                                            svg
                                                use(xlink:href="@/assets/img/material-icon.svg#icon-credit-card")
                                            span Billing
                                        li(@click="navigateToPage")
                                            //- .material-symbols-outlined.notranslate settings
                                            svg
                                                use(xlink:href="@/assets/img/material-icon.svg#icon-settings")
                                            span Account Settings
                                        li(@click="logout")
                                            //- .material-symbols-outlined.notranslate logout
                                            svg
                                                use(xlink:href="@/assets/img/material-icon.svg#icon-logout")
                                            span Logout
                                    //- .policy
                                    //-     router-link(to="/pp.html" target="_blank") Terms of service • Privacy policy
                template(v-else)
                    li.go-github
                        a(href="https://github.com/broadwayinc/skapi-js" target="_blank")
                            img(src="@/assets/img/icon/icon_github.svg" style="filter: invert(1);")
                    li
                        a.ser(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank") Docs
                    li
                        router-link.ser(to="/login") Login
                    li
                        router-link(to="/signup")
                            button.final Sign-up


#proceeding(v-if="running")
    .inner    
        .loader(style="--loader-color:black; --loader-size: 20px")
        h4 Page Loading
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { skapi } from "@/main";
import { serviceMainLoaded, currentService } from '@/views/service/main';
import { user, customer } from "@/code/user";
import { showDropDown } from "@/assets/js/event.js";
import { setAutoHide, removeListener, routeName } from "./navBar-autohide.ts";

const router = useRouter();
const route = useRoute();

let navBar = ref(null);
let moreVert = ref(null);
let running = ref(false);
let serviceName = ref(currentService?.service?.name || "");

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
    router.push({ path: "/account-setting" });
};

let logout = () => {
    skapi.logout().then(() => {
        router.push({ path: "/login" });
    });
};

onMounted(() => {
    setAutoHide(navBar.value, 3);
    window.addEventListener('serviceChanged', updateServiceName);
});

onBeforeUnmount(() => {
    removeListener();
    window.removeEventListener('serviceChanged', updateServiceName);
});

watch(() => route.name, (nv, ov) => {
    if (nv) {
        routeName.value = typeof nv === 'string' ? nv : '';
    }
    // if(nv !== 'home') {
    // 	document.body.style.setProperty('--nav-position', 'sticky');
    // 	document.body.style.setProperty('--nav-top', '0px');
    // } else {
    // 	document.body.style.setProperty('--nav-position', 'fixed');
    // 	document.body.style.setProperty('--nav-top', '20px');
    // }
}, { immediate: true });
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
    position: var(--nav-position, fixed);
    left: 0;
    top: var(--nav-top, 20);
    z-index: 99999;
    width: 100%;
    display: flex;
    align-items: center;
    fill: #333; // for svg
    justify-content: center;
    // background-color: #fff;
    // border-radius: 12px;

    font-size: 20px;
    // border-bottom: 1px solid rgba(0,0,0,0.1);

    .wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        max-width: 80rem;
        padding: 16px 20px;
        // background-color: #fff;
        background-color: rgba(255, 255, 255, 0.8);
        // border: 1px solid rgba(0, 0, 0, 0.05);
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        // box-shadow: rgba(66, 62, 121, 0.06) 0px 48px 96px -24px;
        // box-shadow: rgba(66, 62, 121, 0.1) 0px 0px 90px -14px;
        box-shadow: rgba(66, 62, 121, 0.25) 0px 0px 90px -14px;
        margin: 0 var(--nav-top);
        border-color: #f7f9fc;

        .left {
            // flex-shrink: 0;
            flex-grow: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            // vertical-align: middle;

            .symbol {
                width: 26px;
                cursor: pointer;
                vertical-align: top;
                image-orientation: none;
            }

            .logo {
                display: flex;
                gap: 10px;
                color: #000;
                text-decoration: none;
            }

            .router {
                position: relative;
                flex-grow: 1;

                p {
                    margin: 0;
                }

                .small {
                    position: absolute;
                    left: 0;
                    top: 0;
                    // line-height: 0.7;
                    font-size: 0.7rem;
                    cursor: pointer;
                    white-space: nowrap;
                    opacity: 0.7;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                .big {
                    width: 100%;
                    // min-width: 60px;
                    // line-height: 1.2;
                    font-weight: bold;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-top: 0.7rem;
                }
            }
        }

        .right {
            display: inline-block;
            vertical-align: middle;
            // flex-grow: 1;
            // font-weight: bold;
            // font-size: 0.9rem;

            ul {
                position: relative;
                text-align: right;
                margin: 0;
                padding: 0;
                white-space: nowrap;

                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 24px;

                &.menu-wrap {
                    height: 40px;
                }

                li {
                    display: inline-block;
                    vertical-align: middle;
                    list-style: none;
                    user-select: none;
                    cursor: pointer;
                    display: flex;

                    a {
                        // color: rgb(83, 84, 121);
                        color: #333;
                    }
                }
            }

            .go-github {
                margin-right: 1.25rem;

                a {
                    width: 20px;
                    height: 20px;
                    position: relative;

                    &::after {
                        content: "";
                        display: inline-block;
                        width: 1px;
                        height: 20px;
                        // background-color: rgba(255, 255, 255, 0.4);
                        background-color: rgba(0, 0, 0, 0.4);
                        position: absolute;
                        right: -24px;
                    }
                }
            }
        }

        @media all and (pointer: fine) {
            .prof:hover {
                &>.material-symbols-outlined:first-child {
                    box-shadow: inset 0px 0px 0 4px rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                }
            }

            .prof>svg:hover {
                box-shadow: inset 0px 0px 0 4px rgba(255, 255, 255, 0.5);
                border-radius: 50%;
            }
        }

        .profile {
            text-align: left;
            color: #000;
            font-size: 16px;
            font-weight: normal;
            user-select: none;

            .account {
                padding: 14px 20px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            }

            ul {
                display: block;
                text-align: left;
                padding: 10px 20px;
                color: var(--main-color);

                li {
                    display: block;
                    padding: 8px 0;

                    span {
                        font-weight: 500;
                    }

                    &:hover {
                        span {
                            text-decoration: underline;
                        }
                    }
                }

                .material-symbols-outlined {
                    font-size: 24px;
                    color: var(--main-color);
                    margin-right: 8px;
                }

                svg {
                    height: 24px;
                    width: 24px;
                    fill: var(--main-color);
                    margin-right: 8px;
                }
            }

            // .policy {
            //     border-top: 1px solid rgba(0, 0, 0, 0.15);
            //     font-size: 14px;
            //     font-weight: bold;
            //     text-align: center;
            //     padding: 12px 30px;
            //     white-space: nowrap;

            //     a {
            //         color: var(--black-4);
            //         font-weight: 300;
            //     }
            // }
        }

        a:not(.policy a) {
            // color: #fff;
        }
    }

    // 241024 추가
    .final {
        // min-width: 128px;
        height: 40px;
        // color: #293FE6;
        // background-color: #fff;
        padding: 0px 16px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: conver;
    }
}

@media (max-width: 600px) {
    .desktop {
        display: none;
    }

    img.symbol.mobile {
        display: block;
    }

    #navBar {
        .wrap {
            .left {
                .router {
                    .big {
                        width: calc(100vw - 215px);
                    }
                }
            }

            .right {
                ul {
                    gap: 0.9rem;

                    li {
                        font-size: 0.9rem;
                    }
                }

                .go-github {
                    margin-right: 0.9rem;

                    a {
                        width: 16px;
                        height: 16px;

                        &::after {
                            height: 0.9rem;
                            right: -0.9rem;
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 476px) {
    #navBar {
        .wrap {
            .right {
                .go-github {
                    display: none;
                }
            }
        }
    }
}
</style>
