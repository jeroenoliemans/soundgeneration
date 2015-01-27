function Sound() {
    this.audio_context = new webkitAudioContext();
    this.oscillator = this.audio_context.createOscillator();
}
  
  Sound.prototype.play = function (freq) {
    console.log(this);
    this.oscillator.frequency.value = freq;
    this.oscillator.connect(this.audio_context.destination);
    this.oscillator.noteOn(0);
    console.log('play')
  }
  
  Sound.prototype.stop =  function() {
    this.oscillator.noteOff(0);
    console.log('stop');
  }