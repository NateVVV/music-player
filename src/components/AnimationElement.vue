<template>
    <v-card class="ma-2 pa-2">
        <v-container>
            <v-row no-gutters>
                <v-col cols="8">
                    <v-select
                        v-model="type"
                        :items="types"
                        label="Type"
                        solo
                    ></v-select>
                </v-col>
                <v-col cols="4">
                    <v-btn icon color="red" @click="deleteAnimation"
                        ><v-icon>mdi-delete</v-icon></v-btn
                    >
                </v-col>
            </v-row>
            <v-row v-if="hasOption('count')">
                <v-col cols="12"
                    ><v-slider
                        v-model="element._options.count"
                        min="10"
                        max="191"
                        thumb-label
                        label="Count"
                    ></v-slider
                ></v-col>
            </v-row>
            <v-row v-if="hasOption('diameter')">
                <v-col cols="12"
                    ><v-slider
                        v-model="element._options.diameter"
                        min="0"
                        max="800"
                        thumb-label
                        label="Diameter"
                    ></v-slider
                ></v-col>
            </v-row>
            <v-row v-if="hasOption('rounded')">
                <v-col cols="12"
                    ><v-switch
                        v-model="element._options.rounded"
                        label="Rounded"
                    ></v-switch
                ></v-col>
            </v-row>
            <v-row v-if="hasOption('mirroredX')">
                <v-col cols="12">
                    <v-switch
                        v-model="element._options.mirroredX"
                        label="Mirrored X"
                    ></v-switch>
                </v-col>
            </v-row>
            <v-row v-if="hasOption('fillColor')">
                <v-col>Fill Color</v-col>
                <template
                    v-for="(color, i) in element._options.fillColor.gradient"
                >
                    <v-col :key="i">
                        <v-color-picker
                            type="hexa"
                            mode="hexa"
                            v-model="element._options.fillColor.gradient[i]"
                        ></v-color-picker>
                    </v-col>
                </template>
            </v-row>
            <v-row v-if="hasOption('frequencyBand')">
                <v-col cols="12"
                    ><v-slider
                        min="0"
                        max="3"
                        thumb-label
                        label="Frequency Band"
                        @change="changeFrequencyBand"
                        ref="frequencySlider"
                        v-model="frequencyBand"
                    >
                        <template v-slot:thumb-label="{ value }">
                            {{ frequencyBands[value] }}
                        </template>
                    </v-slider></v-col
                >
            </v-row>
            <v-row v-if="hasOption('glow')">
                <v-col>Glow</v-col>
                <v-col>
                    <v-color-picker
                        type="hexa"
                        mode="hexa"
                        v-model="element._options.glow.color"
                    ></v-color-picker>
                </v-col>
                <v-col>
                    <v-slider
                        v-model="element._options.glow.strength"
                        min="0"
                        max="100"
                        thumb-label
                        label="Strength"
                    >
                    </v-slider>
                </v-col>
            </v-row>
            <v-row v-if="hasOption('lineColor')">
                <v-col>Line Color</v-col>
                <v-col>
                    <v-color-picker
                        show-swatches
                        type="hexa"
                        mode="hexa"
                        v-model="element._options.lineColor"
                    ></v-color-picker>
                </v-col>
            </v-row>
            <v-row v-if="hasOption('lineWidth')">
                <v-col cols="12"
                    ><v-slider
                        v-model="element._options.lineWidth"
                        min="0"
                        max="400"
                        thumb-label
                        label="Line Width"
                    ></v-slider
                ></v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-switch
                        label="Rotate"
                        v-model="rotationEnabled"
                    ></v-switch>
                </v-col>
                <v-col cols="8">
                    <v-slider
                        v-model="rotationSpeed"
                        :disabled="!rotationEnabled"
                        min="1"
                        max="1000"
                        thumb-label
                        label="ms"
                    ></v-slider>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { animations, rotate, stopRotation } from "@/lib/wave.js";

export default {
    name: "AnimationElement",
    props: ["item", "index"],
    data: () => ({
        frequencyBands: ["base", "lows", "mids", "highs"],
        element: null,
        frequencyBand: null,
        rotationEnabled: true,
        rotationSpeed: 100,
        type: "Glob",
        types: Object.keys(animations(null)),
    }),
    created() {
        this.setElement(this.item);
    },
    mounted() {
        this.frequencyBand = this.frequencyBands.indexOf(
            this.element._options.frequencyBand
        );
        this.element._options.rounded = true;
        //this.element._options.glow = true;
        //this.element._options.color = "#D7821CFF";
    },
    methods: {
        changeFrequencyBand(value) {
            const frequencyBand = this.frequencyBands[value];
            this.element._options.frequencyBand = frequencyBand;
            // may not be necessary (to send the update)
            this.$emit("change-frequency-band", frequencyBand, this.index);
        },
        setElement(element) {
            // stop rotation from previous element
            if (this.element) stopRotation(this.element);
            this.element = element;
            this.type = this.element.type;
            this.rotationEnabled = this.element.intervalId != undefined;
        },
        deleteAnimation() {
            console.log("Delete");
            this.$emit("delete-animation", this.index);
        },
        hasOption(option) {
            console.log(animations()[this.type]);
            return animations()[this.type].options.includes(option);
        },
    },
    watch: {
        rotationSpeed(speed) {
            if (!this.rotationEnabled) return;
            rotate(this.element, speed);
        },
        rotationEnabled(enabled) {
            // clear old interval
            stopRotation(this.element);
            // set new intervall if necessary
            if (enabled) {
                rotate(this.element, this.rotationSpeed);
            }
        },
        type(newType) {
            this.$emit("change-animation-type", newType, this.index);
        },
        item() {
            this.setElement(this.item);
        },
    },
};
</script>
