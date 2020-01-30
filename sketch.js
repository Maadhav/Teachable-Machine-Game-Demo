

  var gameInstance = UnityLoader.instantiate("gameContainer", "Build/FinalTest03.json", {onProgress: UnityProgress});

  const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/DylanDawkinsFinalModel05-08/model.json';

  //const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/DylanDawkinsFinalModel01/model.json';
  //const checkpoint = 'https://storage.googleapis.com/tm-pro-a6966.appspot.com/Yining-image-example/model.json';
  const maxPredictions = 5;

  let model;
  let video;

  // A function that loads the model
  async function load() {
    model = await tm.mobilenet.load(checkpoint);
  }

  async function setup() {
    // Call the load function, wait util it finishes loading
    await load();

    // Get videos from webcam
    video = createCapture(VIDEO);
    video.size(400, 300);

    noCanvas();

    // Make a prediction on video


    button = createButton("start game");
    button.position(19,19);
    button.mousePressed(() =>{
      predictVideo(video.elt);
    })
  }


  async function predictVideo(image) {
    const prediction = await model.predict(image);
    console.log('prediction[0].className: ', prediction[0].className)

    MoveGuy(prediction);

    // Show the result
    // const res = select('#res'); // select <span id="res">
    // res.html(prediction[0].className);

    // Show the probability
    // const prob = select('#prob'); // select <span id="prob">
    // prob.html(prediction[0].probability);

    // Continue to predict the video
    predictVideo(video.elt);
    showPrediction(prediction);
  }

  function MoveGuy(prediction){

    let codeV = "";
    let codeH = "";

      if (prediction[0].className == 3) {
        codeH = "left";
        console.log("left pressed");
      } else if (prediction[0].className == 4) {
        codeH = "right";
        console.log("right pressed");
      } else if (prediction[0].className == 1){
        codeV = "up";
        console.log("up pressed");
      } else if (prediction[0].className == 2){
        codeV = "down";
        console.log("down pressed");
      } else {
        codeV = "";
        codeH = "";
      }

    // gameInstance.SendMessage("lp_guy", "SetV", codeV);
    // gameInstance.SendMessage("lp_guy", "SetH", codeH);

    if(gameInstance != null){
      gameInstance.SendMessage("lp_guy", "SetV", codeV);
      gameInstance.SendMessage("lp_guy", "SetH", codeH);
    }


  }

  function showPrediction(prediction){
    //console.log('prediction: ', prediction);

    // // Show the probability for class 0 (neutral)
    // prob0.innerHTML = prediction[0].probabilit[0];
    //
    // // Show the probability for class 1 (up)
    // prob1.innerHTML = prediction[0].probability[1];
    //
    // // Show the probability for class 2 (down)
    // prob2.innerHTML = prediction[0].probability[2];
    //
    // // Show the probability for class 3 (left)
    // prob3.innerHTML = prediction[0].probability[3];
    //
    // // Show the probability for class 4 (right)
    // prob4.innerHTML = prediction[0].probability[4];

  }
