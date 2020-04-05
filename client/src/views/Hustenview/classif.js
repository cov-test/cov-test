//adapted by C.G. from sample from Teachable Machines

import * as speechCommands from '@tensorflow-models/speech-commands';
import * as tfjs from '@tensorflow/tfjs';

//config section
const URL = 'https://www.brainsignals.de/cough-test/my_model/'; //TODO put here the URL that depends on the deployment
//const URL = 'file://../../../assets/model/'; //TODO put here the URL that depends on the deployment
//const URL="file:///work/corona/git/cov-test/ml/my_model/"
const detectiondbg = 0; //if 1 then it shows the accumulating scores
const thr1 = 0.7;
const nrseconds = 16;
const maxframes = 7;

// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the link to your model provided by Teachable Machine export panel

async function createModel() {
  const checkpointURL = URL + 'model.json'; // model topology
  const metadataURL = URL + 'metadata.json'; // model metadata
  const recognizer = speechCommands.create(
    'BROWSER_FFT', // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL,
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
}

var allscores;
var frames;
var tobj;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function classify() {
  const recordingbtn = document.getElementById('recordingbtn');
  const origtext = recordingbtn.textContent;

  await init();
  await sleep(100);

  recordingbtn.textContent = origtext;
  //put the style back, can be done with css as well
  recordingbtn.style.backgroundColor = '#ffffff';

  //decision logic
  let mx = Math.max(allscores[0], allscores[1]);
  if (mx < thr1) return 0; //no cough
  if (allscores[0] > allscores[1]) return 1;
  //dry
  else return 2; //productive
}

async function init() {
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels
  const labelContainer = document.getElementById('label-container');
  const recordingbtn = document.getElementById('recordingbtn');

  if (detectiondbg) {
    for (let i = 0; i < classLabels.length; i++) {
      labelContainer.appendChild(document.createElement('div'));
    }
    labelContainer.appendChild(document.createElement('div'));
  }

  allscores = [0, 0, 0];
  frames = 0;
  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields

  recognizer.listen(
    (result) => {
      //change the style of the button, can be done with css as well
      recordingbtn.style.backgroundColor = '#ff0000';
      recordingbtn.textContent = 'Recording';

      frames = frames + 1;
      const scores = result.scores; // probability of prediction for each class
      // render the probability scores per class
      for (let i = 0; i < classLabels.length; i++) {
        allscores[i] = Math.max(allscores[i], result.scores[i]);
        const classPrediction = classLabels[i] + ': ' + allscores[i].toFixed(2);
        if (detectiondbg) labelContainer.childNodes[i].innerHTML = classPrediction;
      }
      if (detectiondbg) labelContainer.childNodes[3].innerHTML = 'seen: ' + frames;
    },
    {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
    },
  );

  let ready = new Promise(function (resolve, reject) {
    // Stop the recognition in 5 seconds.
    tobj = setInterval(() => {
      if (frames > maxframes) {
        recognizer.stopListening();
        clearInterval(tobj);
        resolve(allscores);
      }
    }, 1000);
  });
  return ready;
}

export default classify;
