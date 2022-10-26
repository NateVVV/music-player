<template>
    <v-container>
        <v-btn @click="browse">Browse</v-btn>
        <v-list>
            <v-subheader>
                {{ directory }}
            </v-subheader>

            <v-list-item-group v-model="selectedTrack" color="primary">
                <v-list-item
                    v-for="(item, i) in files"
                    :key="i"
                    active-color="primary"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-music</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.name"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-container>
</template>

<script>
//https://web.dev/file-system-access/#opening-a-directory-and-enumerating-its-contents
import eventBus from "@/event-bus.js";

export default {
    name: "FileExplorer",
    data: () => ({
        directory: "",
        files: [],
        selectedTrack: null,
    }),
    methods: {
        async browse() {
            const dirHandle = await window.showDirectoryPicker();
            this.directory = dirHandle.name;
            const filesPromises = [];
            for await (const fileHandle of dirHandle.values()) {
                if (fileHandle.kind !== "file") {
                    // ignore directories for now
                    continue;
                }
                filesPromises.push(fileHandle.getFile());
            }
            const files = await Promise.all(filesPromises);
            this.files = files.filter((f) => f.type == "audio/mpeg");
            this.selectedTrack = 0;
            this.loadMusic(this.selectedTrack);
        },
        loadMusic(trackIndex) {
            const file = this.files[trackIndex];
            eventBus.$emit("track-selection", file);
        },
    },
    watch: {
        selectedTrack(newTrack) {
            this.loadMusic(newTrack);
        },
    },
};
</script>
