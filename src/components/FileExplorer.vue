<template>
    <v-container>
        <v-btn @click="browse">Browse</v-btn>
        <v-list>
            <v-list-subheader>
                {{ directory }}
            </v-list-subheader>
            <v-list-item
                v-for="(item, i) in files"
                :key="i"
                :value="item"
                active-color="primary"
            >
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item>
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
        track: null,
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
            this.playMusic();
        },
        playMusic() {
            const audio = document.getElementById("audioElm");
            const audioSrc = document.getElementById("audioSrc");
            const file = this.files[0];

            audioSrc.type = file.type;
            console.log(file);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log(e);
                    audioSrc.src = e.target.result;
                    audio.load();
                };
                reader.readAsDataURL(file);
            }
        },
    },
};
</script>
