import wave, struct, math, random

sample_rate = 44100.0
duration = 10.0 # seconds
freq = 50.0

obj = wave.open('d:/moonlight/moon-frontend/moonlight-frontend/public/sound.wav','w')
obj.setnchannels(1)
obj.setsampwidth(2)
obj.setframerate(sample_rate)

for i in range(int(duration * sample_rate)):
    # Low frequency drone
    value = math.sin(2.0 * math.pi * freq * (i / sample_rate)) * 0.4
    # Pink noise approximation (very basic)
    value += (random.random() * 2 - 1) * 0.1
    # Smooth envelope to avoid clicks when looping
    env = 1.0 - abs((i - (duration * sample_rate)/2) / ((duration * sample_rate)/2))
    env = math.pow(env, 0.5) # slightly rounder envelope
    data = struct.pack('<h', int(value * env * 32767.0))
    obj.writeframesraw(data)
obj.close()
