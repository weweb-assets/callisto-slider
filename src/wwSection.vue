<template>
    <div class="slider">
        <wwLayout class="top-layout" :class="{ isEditing: isEditing }" path="top"></wwLayout>
        <div class="slide-container" :style="currentTranslation">
            <div class="slide" v-for="index in slides" :key="index">
                <wwLayout class="slide-layout" :class="{ isEditing: isEditing }" :path="`slides[${index}]`"></wwLayout>
            </div>
        </div>
        <div class="next-slide-container" @click="nextSlide">
            <wwLayout class="next-slide" :class="{ isEditing: isEditing }" path="next" @click="nextSlide"></wwLayout>
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
        transitionDuration: 1.8,
        transitionFunction: 'ease',
        automaticSlideInterval: '5s',
        automatic: false,
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

            if (interval <= this.content.transitionDuration) {
                console.log('too small');
            }

            if (this.content.automatic) {
                this.autoInterval = setInterval(() => {
                    console.log(interval);
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
                    console.log(interval);
                    this.nextSlide();
                }, interval * 1000);
            }
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
    },
    methods: {
        nextSlide() {
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
    },
    mounted() {
        this.nextElement = document.querySelector('.next-slide-container');
    },
};
</script>

<style lang="scss" scoped>
.slider {
    min-height: 80vh;
    overflow: hidden;
    width: 100%;

    .bottom-layout,
    .top-layout {
        min-height: 50px;
        width: 84%;
        margin: auto;

        &.isEditing {
            border: 1px dashed var(--ww-color-dark-500);
        }
    }

    .slide-container {
        --current-translation: 0%;
        --transition-duration: 1.5s;
        --transition-style: ease;

        z-index: 2;
        width: 80%;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        transform: translate3d(var(--current-translation), 0, 0);
        transition: all var(--transition-duration);
        transition-timing-function: var(--transition-style);

        .slide {
            position: relative;
            min-width: 80%;
            margin-left: 20%;
            min-height: 200px;
            // background-color: burlywood;

            .slide-layout {
                display: flex;
                flex-direction: column;
                justify-content: stretch;
                width: 100%;
                height: 100%;

                &.isEditing {
                    border: 1px dashed var(--ww-color-dark-500);
                }
            }

            &:first-child {
                margin-left: 10%;
            }
        }
    }

    .next-slide-container {
        z-index: 1;
        opacity: 1;
        transition: all 0.2s;

        &.hidden {
            opacity: 0;
            transition: all 0.2s;
        }

        .next-slide {
            position: absolute;
            right: 20%;
            top: 50%;
            transform: translateY(-50%) translateX(50%);

            &.isEditing {
                border: 1px dashed var(--ww-color-dark-500);
            }
        }
    }
}
</style>
