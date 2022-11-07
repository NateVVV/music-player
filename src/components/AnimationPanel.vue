<template>
    <v-container>
        <v-btn @click="addAnimationElement">Add Animation</v-btn>
        <template v-for="(item, i) in animations">
            <AnimationElement
                :key="i"
                :item="item"
                :type="item.type"
                :index="i"
                @change-frequency-band="changeFrequencyBand"
                @change-animation-type="changeAnimationType"
            >
            </AnimationElement>
        </template>
    </v-container>
</template>

<script>
import eventBus from "@/event-bus.js";

import AnimationElement from "@/components/AnimationElement.vue";

import { createAnimation } from "@/lib/wave.js";

export default {
    name: "AnimationPanel",
    components: { AnimationElement },
    data: () => ({
        wave: null,
        animations: [],
        frequencyBands: ["base", "lows", "mids", "highs"],
        frequencyBandHelpers: [],
    }),
    mounted() {
        eventBus.$on("wave-instantiated", (wave) => {
            this.wave = wave;
        });
    },
    watch: {
        wave() {
            // clear old animations
            this.animations = [];
            // add default animation
            this.addAnimationElement(null);
        },
    },
    methods: {
        addAnimation(animation) {
            this.wave.addAnimation(animation);
            this.frequencyBandHelpers.push(animation._options.frequencyBand);
            this.animations.push(animation);
        },
        addAnimationElement(event, type = "Glob") {
            // add an (default) animation element
            console.log(event);
            console.log(type);
            const a = createAnimation(this.wave, type);
            this.addAnimation(a);
        },
        changeFrequencyBand(frequencyBand, index) {
            this.animations[index]._options.frequencyBand = frequencyBand;
        },
        changeAnimationType(type, index) {
            console.log(`change type. ${type} at ${index}`);
            let animation = this.animations[index];
            let newAnimation = createAnimation(
                this.wave,
                type,
                animation._options
            );
            const laterAnimations = (() => {
                const a = [];
                for (let i = index + 1; i < this.animations.length; i++) {
                    a.push(this.animations[i]);
                }
                return a;
            })();
            this.$set(this.animations, index, newAnimation);
            for (let i = this.animations.length - 1; i > index + 1; i--) {
                this.$delete(this.animations, index);
            }
            this.wave.clearAnimations();
            for (const animation of this.animations) {
                this.wave.addAnimation(animation);
            }
            for (const animation of laterAnimations) {
                this.wave.addAnimation(animation);
            }
        },
    },
};
</script>
