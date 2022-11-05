<template>
    <v-card class="ma-2 pa-2">
        <v-container>
            <v-row no-gutters>
                <v-col>
                    <v-select
                        v-model="type"
                        :items="types"
                        label="Type"
                        solo
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
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
            <v-row>
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
            <div>fill color: {{ element._options.fillColor }}</div>
            <v-row>
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
            <v-row>
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
            <v-row>
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
            <v-row>
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
            <v-row>
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
            <div v-if="type != 'Glob'">
                mirrored X: {{ element._options.mirroredX }}
            </div>
            <v-row>
                <v-col cols="12"
                    ><v-switch
                        v-model="element._options.rounded"
                        label="Rounded"
                    ></v-switch
                ></v-col>
            </v-row>
            <div>rotate: {{ element._options.fillColor.rotate }}</div>
            <v-row>
                <v-col cols="12">Rotate</v-col>
                <v-col cols="12">
                    <v-switch
                        label="Rotate"
                        v-model="rotationEnabled"
                    ></v-switch>
                </v-col>
                <v-col cols="12">
                    <v-slider
                        v-model="rotationSpeed"
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
        types: ["Glob", "Arcs", "Wave"],
    }),
    created() {
        this.element = this.item;
        this.type = this.element.type;
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
    },
    watch: {
        rotationSpeed(speed) {
            if (!this.rotationEnabled) return;
            clearInterval(this.element.intervalId);
            this.element.intervalId = setInterval(() => {
                this.element._options.fillColor.rotate += 3;
                this.element._options.fillColor.rotate %= 360;
            }, speed);
        },
        rotationEnabled(enabled) {
            if (!enabled) {
                clearInterval(this.element.intervalId);
            } else {
                this.element.intervalId = setInterval(() => {
                    this.element._options.fillColor.rotate += 10;
                    this.element._options.fillColor.rotate %= 360;
                }, this.rotationSpeed);
            }
        },
        type(newType) {
            this.$emit("change-animation-type", newType, this.index);
        },
        item() {
            this.element = this.item;
            this.type = this.element.type;
        },
    },
};
</script>
