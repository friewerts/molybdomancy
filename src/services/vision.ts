import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

let model: mobilenet.MobileNet | null = null;

export const loadModel = async () => {
  if (model) return;
  console.log('Loading MobileNet model...');
  model = await mobilenet.load();
  console.log('Model loaded.');
};

export const classifyImage = async (imageElement: HTMLImageElement | HTMLVideoElement) => {
  if (!model) {
    await loadModel();
  }
  if (!model) throw new Error('Model failed to load');

  const predictions = await model.classify(imageElement);
  return predictions;
};
