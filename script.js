import WaveSurfer from "https://unpkg.com/wavesurfer.js";

document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById("audio-upload");
    const playPauseButton = document.getElementById("play-pause");
    const trimButton = document.getElementById("trim");
    const volumeUpButton = document.getElementById("volume-up");
    const volumeDownButton = document.getElementById("volume-down");
    const downloadButton = document.getElementById("download");

    // Initialize WaveSurfer with optimized settings for large files
    const waveform = WaveSurfer.create({
        container: "#waveform",
        waveColor: "violet",
        progressColor: "purple",
        backend: "MediaElement", // Optimized for large files
        responsive: true,
        barWidth: 2,
        height: 100
    });

    // Event listener for file upload
    uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            waveform.load(objectURL);
        }
    });

    // Ensure interactions only happen when the waveform is ready
    waveform.on("ready", () => {
        console.log("Waveform is ready for interaction.");
    });

    waveform.on("error", (error) => {
        console.error("Waveform error:", error);
        alert("An error occurred while processing the MP3 file.");
    });

    // Play/Pause functionality
    playPauseButton.addEventListener("click", () => {
        if (waveform.isReady) {
            waveform.playPause();
        } else {
            alert("Waveform is not ready yet. Please wait.");
        }
    });

    // Volume adjustment
    volumeUpButton.addEventListener("click", () => {
        waveform.setVolume(Math.min(waveform.getVolume() + 0.1, 1));
    });

    volumeDownButton.addEventListener("click", () => {
        waveform.setVolume(Math.max(waveform.getVolume() - 0.1, 0));
    });

    // Trimming (basic example, more advanced functionality requires additional tools)
    trimButton.addEventListener("click", () => {
        const start = 10; // Start trim at 10 seconds
        const end = 20;  // End trim at 20 seconds

        // Check if backend supports trimming
        const audioBuffer = waveform.backend.buffer;
        if (audioBuffer) {
            // Trim and reload the waveform (simplified example)
            const trimmedBuffer = audioBuffer.slice(
                audioBuffer.sampleRate * start,
                audioBuffer.sampleRate * end
            );
            waveform.load(trimmedBuffer);
        } else {
            alert("Trimming is not supported for this file type.");
        }
    });

    // Download functionality (to be implemented)
    downloadButton.addEventListener("click", () => {
        alert("Download functionality is not implemented yet.");
    });
});
