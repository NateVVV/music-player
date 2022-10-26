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
                        <v-icon>mdi-clock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            v-text="item.name"
                        ></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <audio controls id="audioElm">
            <source id="audioSrc" />
            Your browser does not support the audio format.
        </audio>
    </v-container>
</template>

<script>
//https://web.dev/file-system-access/#opening-a-directory-and-enumerating-its-contents
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
            const audio = document.getElementById("audioElm");
            const audioSrc = document.getElementById("audioSrc");
            const file = this.files[trackIndex];

            audioSrc.type = file.type;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    audioSrc.src = e.target.result;
                    audio.load();
                };
                reader.readAsDataURL(file);
            }
        },
    },
    watch: {
        selectedTrack(newTrack) {
            this.loadMusic(newTrack);
        },
    },
};
</script>
