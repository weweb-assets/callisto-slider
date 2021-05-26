<template>
    <div class="slider">
        <wwLayout class="top-layout" :class="{ isEditing: isEditing }" path="top"></wwLayout>

        <div class="slider-content">
            <div class="slide-container" :style="currentTranslation">
                <div class="slide" v-for="index in slides" :key="index">
                    <wwLayout
                        class="slide-layout"
                        :class="{ isEditing: isEditing }"
                        :path="`slides[${index}]`"
                    ></wwLayout>
                </div>
            </div>
            <div class="next-slide-container" :style="nextButtonPos" @click="nextSlide">
                <wwLayout
                    class="next-slide"
                    :class="{ isEditing: isEditing }"
                    path="next"
                    @click="nextSlide"
                ></wwLayout>
            </div>
        </div>

        <wwLayout class="bottom-layout" :class="{ isEditing: isEditing }" path="bottom"></wwLayout>
    </div>
</template>

<script>
import { getSettingsConfigurations } from './configuration';

export default {
    name: '__COMPONENT_NAME__',
    props: {
        content: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        top: [],
        bottom: [],
        slides: [],
        next: [],
        slidesNumber: '3',
        transitionDuration: 0.8,
        transitionFunction: 'ease',
        automaticSlideInterval: '5s',
        automatic: false,
        slideToEdit: '1',
    },
    /* wwEditor:start */
    wwEditorConfiguration({ content }) {
        return getSettingsConfigurations(content);
    },
    /* wwEditor:end */
    data() {
        return {
            currentSlide: 1,
            autoInterval: null,
            slideWidth: 720,
            slideElements: null,
        };
    },
    watch: {
        'content.automatic'() {
            if (this.autoInterval) {
                this.resetInterval();
            }

            let interval = this.content.automaticSlideInterval.split('');
            interval = parseInt(interval.slice(0, interval.length - 1).join(''));
            interval =
                interval <= this.content.transitionDuration ? interval + this.content.transitionDuration : interval;

            if (this.content.automatic) {
                this.autoInterval = setInterval(() => {
                    this.nextSlide();
                }, interval * 1000);
            } else {
                this.resetInterval();
            }
        },
        'content.automaticSlideInterval'() {
            if (this.autoInterval) {
                this.resetInterval();
            }

            let interval = this.content.automaticSlideInterval.split('');
            interval = parseInt(interval.slice(0, interval.length - 1).join(''));
            interval =
                interval <= this.content.transitionDuration ? interval + this.content.transitionDuration : interval;

            if (this.content.automatic) {
                this.autoInterval = setInterval(() => {
                    this.nextSlide();
                }, interval * 1000);
            }
        },
        'content.slideToEdit'() {
            this.currentSlide = this.content.slideToEdit;
        },
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        slides() {
            return parseInt(this.content.slidesNumber);
        },
        currentTranslation() {
            return {
                '--current-translation': `-${(this.currentSlide - 1) * 100}%`,
                '--transition-duration': `${this.content.transitionDuration}s`,
                '--transition-style': this.content.transitionFunction,
            };
        },
        nextButtonPos() {
            return {
                '--left-position': `${this.slideWidth}px`,
            };
        },
    },
    methods: {
        nextSlide() {
            if (this.isEditing) return;

            this.currentSlide = this.currentSlide === this.slides ? 1 : this.currentSlide + 1;

            if (!this.nextElement) {
                this.nextElement = document.querySelector('.next-slide-container');
            }

            this.nextElement.classList.add('hidden');

            setTimeout(() => {
                this.nextElement.classList.remove('hidden');
            }, this.content.transitionDuration * 800);
        },
        resetInterval() {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        },
        handleWindowSize() {
            this.slideElements = document.querySelector('.slider');
            this.slideWidth = this.slideElements.offsetWidth * 0.7;
        },
    },
    mounted() {
        this.handleWindowSize();
        window.addEventListener('resize', this.handleWindowSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleWindowSize);
    },
};
</script>

<style lang="scss" scoped>
.slider {
    position: relative;
    min-height: 80vh;
    overflow: visible;
    overflow-x: hidden;
    width: 100%;

    .bottom-layout,
    .top-layout {
        min-height: 50px;
        margin: auto;

        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    .slider-content {
        position: relative;

        .slide-container {
            --current-translation: 0%;
            --transition-duration: 1.5s;
            --transition-style: ease;

            position: relative;
            width: 80%;
            z-index: 2;
            display: inline-flex;
            flex-direction: row;
            flex-wrap: nowrap;
            transform: translate3d(var(--current-translation), 0, 0);
            transition: all var(--transition-duration);
            transition-timing-function: var(--transition-style);

            .slide {
                position: relative;
                min-width: 80%;
                margin-right: 20%;
                min-height: 200px;

                .slide-layout {
                    display: flex;
                    flex-direction: column;
                    justify-content: stretch;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .next-slide-container {
            --left-position: 800px;

            position: absolute;
            left: var(--left-position);
            top: 50%;
            transform: translateY(-50%) translateX(-50%);

            z-index: 10;
            opacity: 1;
            transition: all 0.2s;

            @media (max-width: 767.98px) {
                margin-left: 2%;
            }

            @media (max-width: 991.98px) {
                margin-left: 2%;
            }

            &.hidden {
                opacity: 0;
                transition: all 0.2s;
            }

            .next-slide {
                display: flex;
                flex-direction: column;
                justify-content: stretch;
            }
        }
    }
}
</style>
