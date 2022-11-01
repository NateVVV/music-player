<template>
    <v-card class="ma-2 pa-2">
        <v-container>
            <v-row no-gutters>
                <v-col cols="12">{{ glob.type }}</v-col>
            </v-row>
            <v-row>
                <v-col cols="12"
                    ><v-slider
                        v-model="glob._options.count"
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
                        v-model="glob._options.diameter"
                        min="0"
                        max="800"
                        thumb-label
                        label="Diameter"
                    ></v-slider
                ></v-col>
            </v-row>
            <div>fill color: {{ glob._options.fillColor }}</div>
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
            <div>glow: {{ glob._options.glow }}</div>
            <!--<v-row>
                <v-col cols="6">
                    <v-switch
                        v-model="glob._options.glow"
                        label="Glow"
                    ></v-switch>
                </v-col>
            </v-row>-->
            <v-row>
                <v-col>Line Color</v-col>
                <v-col>
                    <v-color-picker
                        show-swatches
                        type="hexa"
                        mode="hexa"
                        v-model="glob._options.lineColor"
                    ></v-color-picker>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12"
                    ><v-slider
                        v-model="glob._options.lineWidth"
                        min="0"
                        max="400"
                        thumb-label
                        label="Line Width"
                    ></v-slider
                ></v-col>
            </v-row>
            <div v-if="glob.type != 'Glob'">
                mirrored X: {{ glob._options.mirroredX }}
            </div>
            <v-row>
                <v-col cols="12"
                    ><v-switch
                        v-model="glob._options.rounded"
                        label="Rounded"
                    ></v-switch
                ></v-col>
            </v-row>
            <div>rotate:</div>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "GlobAnimation",
    props: ["wave", "item", "index"],
    data: () => ({
        frequencyBands: ["base", "lows", "mids", "highs"],
        glob: null,
        frequencyBand: null,
    }),
    created() {
        this.glob = this.item;
    },
    mounted() {
        this.frequencyBand = this.frequencyBands.indexOf(
            this.glob._options.frequencyBand
        );
        this.glob._options.rounded = true;
        //this.glob._options.glow = true;
        //this.glob._options.color = "#D7821CFF";
    },
    methods: {
        changeFrequencyBand(value) {
            const frequencyBand = this.frequencyBands[value];
            this.glob._options.frequencyBand = frequencyBand;
            // may not be necessary (to send the update)
            this.$emit("change-frequency-band", frequencyBand, this.index);
        },
    },
};
</script>
