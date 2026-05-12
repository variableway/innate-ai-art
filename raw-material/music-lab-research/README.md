# AI Music Lab — Deep Research Compendium

> **Scope:** Open-source AI music generation, tools, pipelines, and practical guidance for building a self-owned music lab.
> **Date:** 2026-05-09
> **Context:** This research is intended to support the `raw-material/` track of the Innate project. It covers models, hardware, file formats, datasets, DAW integration, and ready-to-run recipes.

---

## Table of Contents

| # | Document | What you'll find inside |
|---|----------|-------------------------|
| 1 | [`01-open-source-ai-music-landscape.md`](./01-open-source-ai-music-landscape.md) | Foundation models (text-to-audio, symbolic, singing), feature matrices, licensing, and maturity ratings. |
| 2 | [`02-building-the-music-lab.md`](./02-building-the-music-lab.md) | GPU hardware tiers (NVIDIA/Apple/AMD), local vs cloud cost analysis, DAW plugin integration (VST3/AU), audio infrastructure, model orchestration (ComfyUI, FastAPI), and 4 complete system build recommendations. |
| 3 | [`03-music-files-formats-and-datasets.md`](./03-music-files-formats-and-datasets.md) | Audio formats (WAV/FLAC/MP3), symbolic formats (MIDI/MusicXML/ABC), 10+ open datasets, preprocessing pipelines (EnCodec/DAC), annotation strategies, and storage organization. |
| 4 | [`04-starter-recipes-and-workflows.md`](./04-starter-recipes-and-workflows.md) | 4 copy-pasteable setup recipes: Solo Producer ($1K), Research Lab ($5-15K), Live Performance Rig ($3-6K), Content Creator ($700-2K). Includes batch scripts, ComfyUI workflows, and prompt engineering tips. |
| 5 | [`05-reference-links.md`](./05-reference-links.md) | 30+ GitHub repos, 8 landmark papers (arxiv), HuggingFace model cards, community hubs, tutorials, and commercial service (Suno/Udio) vs open-source comparison matrix. |

---

## Quick Takeaways

1. **Best general-purpose local generator:** **ACE-Step 1.5** — open weights (Apache 2.0), runs on 8–24 GB VRAM, supports lyrics, structure tags (`[verse]`/`[chorus]`/`[bridge]`), inpainting, and outpainting. Comparable to the "Stable Diffusion moment" for music.
2. **Best for researchers / fine-tuning:** **Meta MusicGen (AudioCraft)** — well-documented training code, multiple scales (300M → 3.3B), extensive community finetunes. MIT code, CC-BY-NC weights.
3. **Best for singing/voice:** **SongGeneration (LeVo v2)** / **DiffSinger** / **RVC** — separate pipelines for vocal synthesis and voice conversion.
4. **Best for DAW integration:** **gary4juce** (6 AI models as VST3) / **OBSIDIAN Neural** (8-track live) / **MAGDA** (AI-native DAW).
5. **Best for symbolic/MIDI workflows:** **Magenta RealTime**, **Museformer**, or **YuE** for audio-from-symbolic pipelines.
6. **Minimum viable GPU:** NVIDIA RTX 3060 12GB (~$250) for short-loop inference; **RTX 4090/5090 (24-32 GB)** recommended for full songs and training.
7. **File strategy:** Keep a **dual-format archive** — raw audio (WAV 48 kHz) for generative models, and MIDI/ABC for symbolic editing and transcription workflows.
8. **Cost reality:** Light users (<2hr/day) should use cloud (RunPod/Vast.ai); heavy users (>8hr/day) break even on local hardware in ~1.5 years; 24/7 training breaks even in ~5 months.

---

## How to Use This Research

- **If you are a solo producer** → Start with `04-starter-recipes-and-workflows.md` → Recipe A.
- **If you are building a team lab** → Read `02-building-the-music-lab.md` first, then `01-open-source-ai-music-landscape.md` for model selection.
- **If you are curating training data** → Jump to `03-music-files-formats-and-datasets.md`.
- **If you want to look up a specific repo or paper** → `05-reference-links.md` has the full index.
- **If you want everything in one glance** → The tables in `01` and `04` are designed to be scannable.

---

*This directory is a living document. Update model versions and links as the open-source ecosystem evolves.*
