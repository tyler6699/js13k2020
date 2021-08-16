// Song data
var audio;
var songLoaded = false;
var ready = false;
// This music has been exported by SoundBox. You can use it with
// http://sb.bitsnbites.eu/player-small.js in your own product.

// See http://sb.bitsnbites.eu/demo.html for an example of how to
// use it in a demo.

// Song data
var song = {
  songData: [
    { // Instrument 0
      i: [
      2, // OSC1_WAVEFORM
      70, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      2, // OSC2_WAVEFORM
      75, // OSC2_VOL
      128, // OSC2_SEMI
      3, // OSC2_DETUNE
      0, // OSC2_XENV
      0, // NOISE_VOL
      27, // ENV_ATTACK
      8, // ENV_SUSTAIN
      65, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      39, // LFO_AMT
      3, // LFO_FREQ
      1, // LFO_FX_FREQ
      2, // FX_FILTER
      133, // FX_FREQ
      79, // FX_RESONANCE
      2, // FX_DIST
      32, // FX_DRIVE
      128, // FX_PAN_AMT
      4, // FX_PAN_FREQ
      29, // FX_DELAY_AMT
      2 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,1,1,1,3,,2,1,1],
      // Columns
      c: [
        {n: [127,,127,,127,115,127,112,122,,122,,122,110,122,115,124,,124,,124,112,124,112,120,,120,,120,108,120,112,139,,139,,139,,139,,134,,134,,134,,134,,136,,136,,136,,136,,132,,132,,132,,132,,143,,143,,143,,143,,138,,138,,138,,138,,139,,139,,139,,139,,136,,136,,136,,136,,146,,146,,146,,146,,141,,141,,141,,141,,143,,143,,143,,143,,139,,139,,139,,139],
         f: [13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,47,,,,68,,,,51,,,,67,,,,52,,,,67,,,,52,,,,65]},
        {n: [127,,127,,127,115,127,112,122,,122,,122,110,122,115,124,,124,,124,112,124,112,120,,120,,120,108,120,112,,,,,,,,,,,,,,,,,,,,,,,,,,,,,132,138,136,144],
         f: [13,,,,,,,,,,,,,,,,,,,,,,,,13,,,,,,,,53,,,,,,,,,,,,,,,,,,,,,,,,67]},
        {n: [127,,127,,127,115,127,112,122,,122,,122,110,122,115,124,,124,,124,112,124,112,120,,120,,120,108,120,112,139,,139,,139,,139,,134,,134,,134,,134,,136,,136,,136,,136,,132,,,,,,,,143,,143,,143,,143,,138,,138,,138,,138,,139,,139,,139,,139,,136,,,,,,,,146,,146,,146,,146,,141,,141,,141,,141,,143,,143,,143,,143,,139],
         f: [13,,,,13,,,,13,,,,13,,,,13,,,,13,,,,13,,13,,13,,,,47,,,,67,,,,51,,,,69,,,,48,,,,68,,,,48,,67,,44]}
      ]
    },
    { // Instrument 1
      i: [
      3, // OSC1_WAVEFORM
      219, // OSC1_VOL
      147, // OSC1_SEMI
      0, // OSC1_XENV
      2, // OSC2_WAVEFORM
      116, // OSC2_VOL
      128, // OSC2_SEMI
      6, // OSC2_DETUNE
      0, // OSC2_XENV
      0, // NOISE_VOL
      6, // ENV_ATTACK
      11, // ENV_SUSTAIN
      71, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      68, // LFO_AMT
      3, // LFO_FREQ
      1, // LFO_FX_FREQ
      2, // FX_FILTER
      48, // FX_FREQ
      125, // FX_RESONANCE
      11, // FX_DIST
      43, // FX_DRIVE
      77, // FX_PAN_AMT
      6, // FX_PAN_FREQ
      25, // FX_DELAY_AMT
      6 // FX_DELAY_TIME
      ],
      // Patterns
      p: [1,1,2,2,2,2,2,2,2,2],
      // Columns
      c: [
        {n: [127,,127,,127,115,127,112,122,,122,,122,110,122,115,124,,124,,124,112,124,112,120,,120,,120,108,120,112],
         f: [13,,13,,13,,,,13,,13,,13,,,,13,,13,,13,,,,13,,13,,13,,,,97,,76,,59,,,,97,,76,,57,,,,97,,76,,60,,,,97,,75,,56]},
        {n: [127,,127,,127,115,127,112,122,,122,,122,110,122,115,124,,124,,124,112,124,112,120,,120,,120,108,120,112,146,151,155,146,151,155,146,151,146,150,153,146,150,153,146,150,148,151,155,148,151,155,148,151,148,151,156,148,151,156,148,151],
         f: [13,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,71]}
      ]
    },
    { // Instrument 2
      i: [
      2, // OSC1_WAVEFORM
      51, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      2, // OSC2_WAVEFORM
      45, // OSC2_VOL
      128, // OSC2_SEMI
      2, // OSC2_DETUNE
      0, // OSC2_XENV
      0, // NOISE_VOL
      53, // ENV_ATTACK
      22, // ENV_SUSTAIN
      158, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      93, // LFO_AMT
      7, // LFO_FREQ
      1, // LFO_FX_FREQ
      3, // FX_FILTER
      18, // FX_FREQ
      39, // FX_RESONANCE
      0, // FX_DIST
      32, // FX_DRIVE
      48, // FX_PAN_AMT
      5, // FX_PAN_FREQ
      61, // FX_DELAY_AMT
      5 // FX_DELAY_TIME
      ],
      // Patterns
      p: [1,1,1,1,1,1,1,1,1,1,1,1,2],
      // Columns
      c: [
        {n: [127,,,,,,,,122,,,,,,,,124,,,,,,,,120,,,,,,,,134,,,,,,,,134,,,,,,,,136,,,,,,,,136,,,,,,,,139,,,,,,,,138,,,,,,,,139,,,,,,,,139,,,,,,,,143,,,,,,,,141,,,,,,,,143,,,,,,,,144],
         f: [11,,,,,,,,,,,,,,,,,,,,,,,,11,,,,,,,,36,,,,,,,,,,,,,,,,,,,,,,,,53]},
        {n: [127,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,134,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,139,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,143],
         f: [11,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,91]}
      ]
    },
    { // Instrument 3
      i: [
      1, // OSC1_WAVEFORM
      192, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      1, // OSC2_WAVEFORM
      192, // OSC2_VOL
      128, // OSC2_SEMI
      1, // OSC2_DETUNE
      0, // OSC2_XENV
      0, // NOISE_VOL
      12, // ENV_ATTACK
      19, // ENV_SUSTAIN
      50, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      152, // LFO_AMT
      5, // LFO_FREQ
      1, // LFO_FX_FREQ
      3, // FX_FILTER
      37, // FX_FREQ
      155, // FX_RESONANCE
      48, // FX_DIST
      57, // FX_DRIVE
      108, // FX_PAN_AMT
      3, // FX_PAN_FREQ
      51, // FX_DELAY_AMT
      3 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,,,1,1,,,1,1],
      // Columns
      c: [
        {n: [134,139,143,134,139,143,134,139,134,138,141,134,138,141,134,138,136,139,143,136,139,143,136,139,136,139,144,136,139,144,136,139,127,,,,,,,,122,,,,,,,,112,,,,,,,,120],
         f: []}
      ]
    },
    { // Instrument 4
      i: [
      3, // OSC1_WAVEFORM
      222, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      0, // OSC2_WAVEFORM
      120, // OSC2_VOL
      116, // OSC2_SEMI
      0, // OSC2_DETUNE
      0, // OSC2_XENV
      19, // NOISE_VOL
      8, // ENV_ATTACK
      3, // ENV_SUSTAIN
      31, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      166, // LFO_AMT
      4, // LFO_FREQ
      1, // LFO_FX_FREQ
      2, // FX_FILTER
      24, // FX_FREQ
      81, // FX_RESONANCE
      17, // FX_DIST
      99, // FX_DRIVE
      80, // FX_PAN_AMT
      5, // FX_PAN_FREQ
      119, // FX_DELAY_AMT
      6 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,,,,,1,2,1,2,3,2,4],
      // Columns
      c: [
        {n: [163,,,,,,,,158,,,,,,,,160,,,,,,,,156,,,,,,,,158,,,,151,,163,,,,,,158,,170,,,,,,148,,160,,,,,,156,,168],
         f: [25,13,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,99,31]},
        {n: [163,,,,,,,,158,,,,,,,,160,,,,,,,,168,,,,,,,,158,,,,151,,163,,,,,,158,,170,,,,,,148,,160,,,,,,168,,180],
         f: [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,25,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,52]},
        {n: [163,,,,,,,,158,,,,,,,,160,,,,,,,,156,,,,,,,,158,,,,151,,163,,,,,,158,,170,,,,,,148,,160,,,,,,156,,168],
         f: [13,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,108]},
        {n: [139,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,151],
         f: []}
      ]
    },
    { // Instrument 5
      i: [
      3, // OSC1_WAVEFORM
      162, // OSC1_VOL
      110, // OSC1_SEMI
      64, // OSC1_XENV
      1, // OSC2_WAVEFORM
      95, // OSC2_VOL
      128, // OSC2_SEMI
      0, // OSC2_DETUNE
      64, // OSC2_XENV
      108, // NOISE_VOL
      0, // ENV_ATTACK
      8, // ENV_SUSTAIN
      160, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      79, // LFO_AMT
      7, // LFO_FREQ
      1, // LFO_FX_FREQ
      3, // FX_FILTER
      89, // FX_FREQ
      154, // FX_RESONANCE
      2, // FX_DIST
      32, // FX_DRIVE
      40, // FX_PAN_AMT
      5, // FX_PAN_FREQ
      115, // FX_DELAY_AMT
      4 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,,,,1,,,,1],
      // Columns
      c: [
        {n: [,,,,,,,,,,,,,,,,,,,,,,,,147],
         f: []}
      ]
    },
    { // Instrument 6
      i: [
      0, // OSC1_WAVEFORM
      0, // OSC1_VOL
      140, // OSC1_SEMI
      0, // OSC1_XENV
      0, // OSC2_WAVEFORM
      0, // OSC2_VOL
      140, // OSC2_SEMI
      0, // OSC2_DETUNE
      0, // OSC2_XENV
      255, // NOISE_VOL
      158, // ENV_ATTACK
      158, // ENV_SUSTAIN
      158, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      51, // LFO_AMT
      2, // LFO_FREQ
      1, // LFO_FX_FREQ
      2, // FX_FILTER
      58, // FX_FREQ
      239, // FX_RESONANCE
      0, // FX_DIST
      97, // FX_DRIVE
      88, // FX_PAN_AMT
      1, // FX_PAN_FREQ
      157, // FX_DELAY_AMT
      2 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,,,,,1,,1],
      // Columns
      c: [
        {n: [135],
         f: []}
      ]
    },
    { // Instrument 7
      i: [
      0, // OSC1_WAVEFORM
      222, // OSC1_VOL
      128, // OSC1_SEMI
      0, // OSC1_XENV
      0, // OSC2_WAVEFORM
      234, // OSC2_VOL
      128, // OSC2_SEMI
      0, // OSC2_DETUNE
      64, // OSC2_XENV
      0, // NOISE_VOL
      196, // ENV_ATTACK
      11, // ENV_SUSTAIN
      236, // ENV_RELEASE
      0, // ENV_EXP_DECAY
      0, // ARP_CHORD
      0, // ARP_SPEED
      0, // LFO_WAVEFORM
      61, // LFO_AMT
      8, // LFO_FREQ
      0, // LFO_FX_FREQ
      2, // FX_FILTER
      5, // FX_FREQ
      140, // FX_RESONANCE
      74, // FX_DIST
      57, // FX_DRIVE
      100, // FX_PAN_AMT
      5, // FX_PAN_FREQ
      92, // FX_DELAY_AMT
      7 // FX_DELAY_TIME
      ],
      // Patterns
      p: [,,,,,,,,,,1],
      // Columns
      c: [
        {n: [139,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,127],
         f: []}
      ]
    },
  ],
  rowLen: 10669,   // In sample lengths
  patternLen: 32,  // Rows per pattern
  endPattern: 12,  // End pattern
  numChannels: 8  // Number of channels
};



/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*-
 *
 * Copyright (c) 2011-2013 Marcus Geelnard
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 *
 * 3. This notice may not be removed or altered from any source
 *    distribution.
 *
 */

"use strict";
var CPlayer = function() {

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Oscillators
    var osc_sin = function(value) {
        return Math.sin(value * 6.283184);
    };

    var osc_saw = function(value) {
        return 2 * (value % 1) - 1;
    };

    var osc_square = function(value) {
        return (value % 1) < 0.5 ? 1 : -1;
    };

    var osc_tri = function(value) {
        var v2 = (value % 1) * 4;
        if (v2 < 2) return v2 - 1;
        return 3 - v2;
    };

    var getnotefreq = function(n) {
        // 174.61.. / 44100 = 0.003959503758 (F3)
        return 0.003959503758 * Math.pow(2, (n - 128) / 12);
    };

    var createNote = function(instr, n, rowLen) {
        var osc1 = mOscillators[instr.i[0]],
            o1vol = instr.i[1],
            o1xenv = instr.i[3],
            osc2 = mOscillators[instr.i[4]],
            o2vol = instr.i[5],
            o2xenv = instr.i[8],
            noiseVol = instr.i[9],
            attack = instr.i[10] * instr.i[10] * 4,
            sustain = instr.i[11] * instr.i[11] * 4,
            release = instr.i[12] * instr.i[12] * 4,
            releaseInv = 1 / release,
            arp = instr.i[13],
            arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);

        var noteBuf = new Int32Array(attack + sustain + release);

        // Re-trig oscillators
        var c1 = 0,
            c2 = 0;

        // Local variables.
        var j, j2, e, t, rsample, o1t, o2t;

        // Generate one note (attack + sustain + release)
        for (j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                // Switch arpeggio note.
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;

                // Calculate note frequencies for the oscillators
                o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }

            // Envelope
            e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e -= (j - attack - sustain) * releaseInv;
            }

            // Oscillator 1
            t = o1t;
            if (o1xenv) {
                t *= e * e;
            }
            c1 += t;
            rsample = osc1(c1) * o1vol;

            // Oscillator 2
            t = o2t;
            if (o2xenv) {
                t *= e * e;
            }
            c2 += t;
            rsample += osc2(c2) * o2vol;

            // Noise oscillator
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }

            // Add to (mono) channel buffer
            noteBuf[j] = (80 * rsample * e) | 0;
        }

        return noteBuf;
    };


    //--------------------------------------------------------------------------
    // Private members
    //--------------------------------------------------------------------------

    // Array of oscillator functions
    var mOscillators = [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ];

    // Private variables set up by init()
    var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;


    //--------------------------------------------------------------------------
    // Initialization
    //--------------------------------------------------------------------------

    this.init = function(song) {
        // Define the song
        mSong = song;

        // Init iteration state variables
        mLastRow = song.endPattern;
        mCurrentCol = 0;

        // Prepare song info
        mNumWords = song.rowLen * song.patternLen * (mLastRow + 1) * 2;

        // Create work buffer (initially cleared)
        mMixBuf = new Int32Array(mNumWords);
    };


    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Generate audio data for a single track
    this.generate = function() {
        // Local variables
        var i, j, b, p, row, col, n, cp,
            k, t, lfor, e, x, rsample, rowStartSample, f, da;

        // Put performance critical items in local variables
        var chnBuf = new Int32Array(mNumWords),
            instr = mSong.songData[mCurrentCol],
            rowLen = mSong.rowLen,
            patternLen = mSong.patternLen;

        // Clear effect state
        var low = 0,
            band = 0,
            high;
        var lsample, filterActive = false;

        // Clear note cache.
        var noteCache = [];

        // Patterns
        for (p = 0; p <= mLastRow; ++p) {
            cp = instr.p[p];

            // Pattern rows
            for (row = 0; row < patternLen; ++row) {
                // Execute effect command.
                var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;

                    // Clear the note cache since the instrument has changed.
                    if (cmdNo < 16) {
                        noteCache = [];
                    }
                }

                // Put performance critical instrument properties in local variables
                var oscLFO = mOscillators[instr.i[15]],
                    lfoAmt = instr.i[16] / 512,
                    lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
                    fxLFO = instr.i[18],
                    fxFilter = instr.i[19],
                    fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
                    q = 1 - instr.i[21] / 255,
                    dist = instr.i[22] * 1e-5,
                    drive = instr.i[23] / 32,
                    panAmt = instr.i[24] / 512,
                    panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
                    dlyAmt = instr.i[26] / 255,
                    dly = instr.i[27] * rowLen & ~1; // Must be an even number

                // Calculate start sample number for this row in the pattern
                rowStartSample = (p * patternLen + row) * rowLen;

                // Generate notes for this pattern row
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = createNote(instr, n, rowLen);
                        }

                        // Copy note from the note cache
                        var noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                            chnBuf[i] += noteBuf[j];
                        }
                    }
                }

                // Perform effects for this pattern row
                for (j = 0; j < rowLen; j++) {
                    // Dry mono-sample
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];

                    // We only do effects if we have some sound input
                    if (rsample || filterActive) {
                        // State variable filter
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;

                        // Distortion
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample * .25) : -1 : 1;
                            rsample /= dist;
                        }

                        // Drive
                        rsample *= drive;

                        // Is the filter active (i.e. still audiable)?
                        filterActive = rsample * rsample > 1e-5;

                        // Panning
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }

                    // Delay is always done, since it does not need sound input
                    if (k >= dly) {
                        // Left channel = left + right[-p] * t
                        lsample += chnBuf[k - dly + 1] * dlyAmt;

                        // Right channel = right + left[-p] * t
                        rsample += chnBuf[k - dly] * dlyAmt;
                    }

                    // Store in stereo channel buffer (needed for the delay effect)
                    chnBuf[k] = lsample | 0;
                    chnBuf[k + 1] = rsample | 0;

                    // ...and add to stereo mix buffer
                    mMixBuf[k] += lsample | 0;
                    mMixBuf[k + 1] += rsample | 0;
                }
            }
        }

        // Next iteration. Return progress (1.0 == done!).
        mCurrentCol++;
        return mCurrentCol / mSong.numChannels;
    };

    // Create a WAVE formatted Uint8Array from the generated audio data
    this.createWave = function() {
        // Create WAVE header
        var headerLen = 44;
        var l1 = headerLen + mNumWords * 2 - 8;
        var l2 = l1 - 36;
        var wave = new Uint8Array(headerLen + mNumWords * 2);
        wave.set(
            [82, 73, 70, 70,
                l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255,
                87, 65, 86, 69, 102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 2, 0,
                68, 172, 0, 0, 16, 177, 2, 0, 4, 0, 16, 0, 100, 97, 116, 97,
                l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255
            ]
        );

        // Append actual wave data
        for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
            // Note: We clamp here
            var y = mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }

        // Return the WAVE formatted typed array
        return wave;
    };

    // Get n samples of wave data at time t [s]. Wave data in range [-2,2].
    this.getData = function(t, n) {
        var i = 2 * Math.floor(t * 44100);
        var d = new Array(n);
        for (var j = 0; j < 2 * n; j += 1) {
            var k = i + j;
            d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0;
        }
        return d;
    };
};

function genAudio() {
    var player = new CPlayer();
    player.init(song);

    setInterval(function() {
        if (songLoaded) {
            return;
        }
        songLoaded = player.generate() >= 1;
        if (songLoaded) {
            var wave = player.createWave();
            audio = document.createElement("audio");
            audio.src = URL.createObjectURL(new Blob([wave], {
                type: "audio/wav"
            }));
            ready = true;
        }
    }, 0);
}
