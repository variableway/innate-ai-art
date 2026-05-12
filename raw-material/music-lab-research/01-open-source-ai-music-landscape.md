# 01 — Open-Source AI Music Landscape

> A model-by-model breakdown of the open-source AI music ecosystem as of mid-2026. Covers text-to-audio, symbolic, singing/voice, and real-time generators.

---

## 🏛️ Category Map

| Category | Use Case | Representative Models |
|----------|----------|----------------------|
| **Text-to-Audio (General)** | Full songs / instrumentals from prompts | ACE-Step, MusicGen, Stable Audio Open, AudioLDM 2, YUE, SongGeneration |
| **Text-to-Audio (Fast/Cheap)** | Bulk background music, prototyping | ACE-Step (fast mode), CassetteAI API, Riffusion |
| **Symbolic (MIDI/ABC)** | Composition, sheet music, theory-aware generation | MuseGAN, Museformer, SD-Muse, LSTM/Transformer MIDI, Magenta |
| **Singing Voice Synthesis (SVS)** | Vocal melodies from lyrics + MIDI | DiffSinger, BEGANSing, SongGeneration |
| **Voice Conversion / Cloning** | Style transfer, timbre swap | RVC, GPT-SoVITS, OpenVoice, CosyVoice |
| **Audio-to-Audio (Editing)** | Inpainting, outpainting, remixing, mastering | ACE-Step (repaint/extend), Stable Audio Open, Demucs (source separation) |
| **Real-Time / DAW Plugins** | Live performance, loop generation inside DAW | OBSIDIAN Neural, DJ-IA VST, gary4juce, MAGDA DAW |

---

## 🎼 Foundation Models (Text-to-Audio)

### 1. ACE-Step 1.5
- **Developer:** Community / ACE-Step team
- **Architecture:** LLM planner (0.6B–4B) → DiT diffusion transformer → audio codec decoder
- **Strengths:**
  - Open weights & fully local inference
  - Multi-lingual lyrics support with structure tags (`[verse]`, `[chorus]`, `[bridge]`, `[inst]`)
  - Inpainting / outpainting / repainting / cover generation
  - Consumer hardware friendly (8 GB VRAM minimum, 24 GB recommended for long tracks)
  - ComfyUI nodes, Gradio WebUI, and direct Python API available
- **Weaknesses:**
  - Very long tracks (4+ min) require significant VRAM or chunking strategies
  - Quality varies heavily with prompt engineering
- **License:** Open-source (check specific repo for latest license; generally permissive)
- **VRAM Tiers:**
  - 8 GB → 30–60 sec tracks, quantized LM
  - 16 GB → 2 min tracks comfortably
  - 24 GB → full 4+ min songs, 4B LM variant
- **Quick Start:**
  ```bash
  git clone https://github.com/ace-step/ACE-Step-1.5.git
  cd ACE-Step-1.5
  pip install -r requirements.txt
  python generate.py --prompt "upbeat lo-fi hip hop with piano" --duration 120
  ```

### 2. Meta MusicGen (AudioCraft)
- **Developer:** Meta AI (Facebook Research)
- **Architecture:** EnCodec/Descript-Audio-Codec tokenizer + single-stage autoregressive Transformer
- **Variants:** `small` (300M), `medium` (1.5B), `large` (3.3B), `melody` (melody-conditioned)
- **Strengths:**
  - Mature, stable codebase
  - Extensive fine-tuning documentation and community support
  - Melody-conditioning allows humming → music generation
  - Works well with AudioCraft’s broader audio suite (AudioGen, EnCodec)
- **Weaknesses:**
  - Base models have **no vocals**; fine-tuning with vocals can produce artifacts
  - Large model needs 16 GB+ VRAM for inference
  - Generation length capped at ~30 seconds per pass (continuation required for longer)
- **License:** MIT / CC-BY-NC (check model card for commercial use)
- **Fine-Tuning Notes:**
  - Minimum 80–100 tracks for style finetuning (30-sec chunks)
  - Consistency in style matters more than quantity
  - Use `dora run solver=musicgen/... continue_from=//pretrained/...`
- **Quick Start:**
  ```bash
  pip install -U audiocraft
  python -c "from audiocraft.models import musicgen; m = musicgen.MusicGen.get_pretrained('small'); m.set_generation_params(duration=10); wav = m.generate(['lofi beat'])"
  ```

### 3. Stable Audio Open (Stability AI)
- **Developer:** Stability AI
- **Architecture:** Latent diffusion model operating on audio latents
- **Strengths:**
  - High-fidelity output, good for sound design and ambient/cinematic music
  - Variable length up to 45 seconds
  - Audio inpainting for localized editing
- **Weaknesses:**
  - Not ideal for structured vocal songs without heavy post-processing
  - Training pipeline is multi-step and more involved than MusicGen
- **License:** Open-source (check Stability AI terms)
- **Integration:** Used inside OBSIDIAN Neural VST and DJ-IA VST as the backend generator.

### 4. SongGeneration (LeVo / LeVo 2)
- **Developer:** Tencent AI Lab
- **Architecture:** Multi-preference aligned music foundation model
- **Variants:** base (10 GB), large / v2-large (22–28 GB)
- **Strengths:**
  - Commercial-grade vocal + accompaniment generation
  - Supports pure music, pure vocals, or dual-track (separated) outputs
  - Full-length songs up to 4 min 30 sec
  - Multi-lingual lyrics (zh, en, es, ja, etc.)
- **Weaknesses:**
  - Higher VRAM requirements than ACE-Step for comparable length
  - Less community fine-tuning infrastructure (as of early 2026)
- **License:** Open-source (check repo)
- **Quick Start:**
  ```bash
  git clone https://github.com/tencent-ailab/songgeneration.git
  pip install -r requirements.txt
  sh generate.sh ckpt_path lyrics.jsonl output_path --separate
  ```

### 5. YUE
- **Developer:** Open-source research community
- **Focus:** Full-length song generation with vocals
- **Status:** Emerging; integrated into some evaluation benchmarks and community UIs
- **Note:** Good to monitor; less mature tooling than ACE-Step or SongGeneration.

### 6. AudioLDM 2 / TANGO 2 / Make-An-Audio 2
- **Use Case:** General sound + music generation; good for SFX and short musical ideas
- **Status:** Stable on HuggingFace, but largely superseded by ACE-Step and MusicGen for music-specific tasks.

---

## 🎹 Symbolic & MIDI-Centric Models

| Model | Type | Best For | Notes |
|-------|------|----------|-------|
| **MuseGAN** | GAN | Multi-instrument MIDI generation | Older but foundational |
| **Museformer** | Transformer | Long-form symbolic music | Good for structure |
| **SD-Muse** | Diffusion | Symbolic generation | Novel approach |
| **Magenta (Realtime)** | RNN/Transformer | Live MIDI improvisation | Easy to fine-tune; DAW-friendly via gary4juce |
| **LSTM / GRU notebooks** | RNN | Educational MIDI generation | Chopin/Mozart style; trainable on single GPU |

**Workflow:** Symbolic model → MIDI → DAW / FluidSynth → WAV.  
**Best when:** You need editable scores, human-readable notation, or theory-aware composition.

---

## 🎤 Singing & Voice

| Tool | Category | VRAM | Best For |
|------|----------|------|----------|
| **DiffSinger** | SVS | ~8 GB | High-fidelity singing voice from lyrics + MIDI |
| **BEGANSing** | SVS + SVC + AudioSR | ~12 GB | Korean-focused; combines synthesis + voice conversion + upsampling |
| **RVC** | Voice Conversion | ~4–8 GB | Real-time voice cloning / timbre transfer |
| **GPT-SoVITS** | TTS + Voice Cloning | ~6 GB | Few-shot voice cloning with high quality |
| **OpenVoice / CosyVoice** | TTS / Voice Cloning | ~4–8 GB | Multi-lingual, emotion control |

---

## 🔌 Real-Time & DAW Integration

| Project | Format | Models Hosted | Status |
|---------|--------|---------------|--------|
| **OBSIDIAN Neural (ai-dj)** | VST3 / AU / Standalone | Stable Audio Open + cloud fallback | Active; live performance focused |
| **DJ-IA VST** | VST3 | Stable Audio Open + local LLM prompts | Proof of concept; open source |
| **gary4juce** | VST3 (JUCE) | MusicGen, Stable Audio Open, MelodyFlow, Magenta Realtime | Active; 6 models in one plugin |
| **ACE-Step-DAW** | Web-based DAW layer | ACE-Step backend | Active; layer-by-layer composition |
| **MAGDA** | Full DAW (C++/JUCE) | Built-in llama.cpp inferencer + custom models | Active; AI-native DAW |

**Architecture pattern for DAW plugins:**
```
DAW (VST host) → JUCE/C++ plugin frontend → Python FastAPI backend → AI model inference
```

---

## 📊 Model Selection Decision Matrix

| Goal | First Choice | Fallback |
|------|--------------|----------|
| General local song generation (vocals + instruments) | ACE-Step 1.5 | SongGeneration v2-large |
| Fine-tuning on my own music style | MusicGen (AudioCraft) | Stable Audio Open |
| Live loop generation inside DAW | OBSIDIAN Neural | gary4juce (MusicGen) |
| Singing voice synthesis | DiffSinger | SongGeneration (vocal mode) |
| Voice cloning / style transfer | RVC | GPT-SoVITS |
| Background music / SFX bulk gen | ACE-Step fast mode | AudioGen (AudioCraft) |
| Symbolic composition / MIDI scores | Magenta / Transformer MIDI | Museformer |

---

## ⚠️ Licensing & Commercial Use Watchouts

- **MusicGen:** MIT code, but model weights may carry CC-BY-NC restrictions — verify the specific model card before commercial release.
- **ACE-Step:** Generally permissive; confirm per release.
- **Stable Audio Open:** Check Stability AI’s current license (historically open but with some usage constraints).
- **SongGeneration:** Check Tencent AI Lab license — usually research-friendly but may have commercial clauses.
- **RVC / GPT-SoVITS:** Often GPL/AGPL; be careful if building proprietary products on top.

*Always read the `LICENSE` and `MODEL_CARD` before shipping a product.*
