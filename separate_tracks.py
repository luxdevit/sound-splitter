import subprocess
import os
import argparse

def separate_audio(input_file: str, device: str = "mps", separate_stems: int = 2):
    """
    Separate audio tracks into vocals + instrumental (2 stems) or full 4 stems.
    """
    if not os.path.exists(input_file):
        raise FileNotFoundError(f"Error: File '{input_file}' does not exist. Please place it in the folder!")

    output_dir = "separated"
    os.makedirs(output_dir, exist_ok=True)

    # Build the command to invoke demucs
    # htdemucs is the default high-quality model
    cmd = [
        "demucs",
        "-n", "htdemucs",
        "-d", device,
        "-o", output_dir
    ]

    # If we want vocals and instrumental, set the flag to isolate vocals only
    if separate_stems == 2:
        cmd.extend(["--two-stems", "vocals"])
    
    cmd.append(input_file)

    print(f"Starting separation... ({separate_stems} stems requested)")
    print(f"Using device: {device.upper()}")
    print("This operation may take a few minutes depending on the song length.\n")
    
    try:
        # Execute the command
        subprocess.run(cmd, check=True)
        print(f"\nDone! Results have been saved to the '{output_dir}/htdemucs/' folder")
        
        base_name = os.path.splitext(os.path.basename(input_file))[0]
        results_dir = os.path.join(output_dir, "htdemucs", base_name)
        
        if separate_stems == 2:
            return {
                "vocals": os.path.join(results_dir, "vocals.wav"),
                "instrumental": os.path.join(results_dir, "no_vocals.wav")
            }
        else:
            return {
                "vocals": os.path.join(results_dir, "vocals.wav"),
                "bass": os.path.join(results_dir, "bass.wav"),
                "drums": os.path.join(results_dir, "drums.wav"),
                "other": os.path.join(results_dir, "other.wav")
            }
            
    except subprocess.CalledProcessError as e:
        print(f"\nAn error occurred during extraction: {e}")
        raise e

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sound Splitter")
    parser.add_argument("--input", "-i", type=str, default="inputs/song.mp3", help="Path of the audio file to separate")
    parser.add_argument("--stems", "-s", type=int, default=2, choices=[2, 4], help="How many tracks to generate: 2 (vocals and rest) or 4 (vocals, drums, bass, other)")

    args = parser.parse_args()
    
    if not os.path.exists(args.input) and args.input == "inputs/song.mp3":
        print("First time here? Place a music file (e.g. Mp3) in the 'inputs/' folder named 'song.mp3'.")
        print("Or use the flag: python separate_tracks.py -i my_audio.wav -s 2")
    else:
        separate_audio(input_file=args.input, separate_stems=args.stems)
