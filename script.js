const start = document.getElementsByClassName('start-btn');
const container = document.getElementsByClassName('container');

const ques = document.getElementById('ques');
const ans = document.getElementById('ans');
const submit = document.getElementsByClassName('submit')[0];
const next = document.getElementsByClassName('next')[0];
const message = document.getElementsByClassName('message')[0];
ans.style.display = 'none';
submit.style.display = 'none';

let numberOfHouseholdMembers;
let avgNumberOfFlushes;
let showerTime;
let faucetTime;
let cwLoadTime;
let dishWashByHand;
let quesIndex = 0;

quesList = [
  { q: 'How many people in household?', a: '' },
  { q: 'Average number of flushes a person does in a day', a: '' },
  { q: 'How long does a person shower in a day (in mins)?', a: '' },
  { q: 'How long does a person use a faucet (in mins)?', a: '' },
  { q: 'How many times is the cloth washer loaded?', a: '' },
  { q: 'How many times are the dishes handwashed?', a: '' },
];

function hideStart() {
  container[0].style.display = 'none';
  showQuiz();
}

function showQuiz() {
  showQuestions();
}

function showQuestions() {
  if (quesIndex < quesList.length - 1) {
    next.style.display = 'block';
  } else {
    next.style.display = 'none';
    submit.style.display = 'block';
  }
  if (quesIndex < quesList.length) {
    ques.innerText = quesList[quesIndex]['q'];
    ans.style.display = 'block';
    next.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      message.style.display = 'none';
      if (ans.value !== '') {
        quesList[quesIndex]['a'] = ans.value;
        quesIndex++;
        ans.value = '';
        showQuiz();
      } else {
        message.style.display = 'block';
      }
    });
  }
  showResults();
}

function showResults() {
  submit.addEventListener('click', () => {
    quesList[quesIndex]['a'] = ans.value;
    container[2].style.display = 'block';
    container[0].style.display = 'none';
    container[1].style.display = 'none';
    ans.style.display = 'none';
    ques.style.display = 'none';
    submit.style.display = 'none';

    numberOfHouseholdMembers = parseInt(quesList[0]['a']);
    avgNumberOfFlushes = parseInt(quesList[1]['a']);
    showerTime = parseInt(quesList[2]['a']);
    faucetTime = parseInt(quesList[3]['a']);
    cwLoadTime = parseInt(quesList[4]['a']);
    dishWashByHand = parseInt(quesList[5]['a']);

    console.log(numberOfHouseholdMembers, avgNumberOfFlushes, dishWashByHand);
    const ltr = 4.546;

    const toiletWaterUseDaily =
      numberOfHouseholdMembers * avgNumberOfFlushes * 3.5 * ltr;
    const showerWaterUseDaily =
      numberOfHouseholdMembers * showerTime * 2.5 * ltr;
    const faucetWaterUseDaily =
      numberOfHouseholdMembers * faucetTime * 2.5 * ltr;
    const cwWaterUseDaily = numberOfHouseholdMembers * cwLoadTime * 43 * ltr;
    const hwWaterUseDaily =
      numberOfHouseholdMembers * dishWashByHand * 4.5 * ltr;

    const toiletWaterUseEco = numberOfHouseholdMembers * 5 * 1.6 * ltr;
    const showerWaterUseEco = numberOfHouseholdMembers * 5 * 2 * ltr;
    const faucetWaterUseEco = numberOfHouseholdMembers * 8 * 1.5 * ltr;
    const cwWaterUseEco = cwLoadTime * 27 * ltr;
    const hwWaterUseEco = numberOfHouseholdMembers * dishWashByHand * 2.5 * ltr;

    const toiletYourUse = document.getElementById('toilet-your-use');
    const showerYourUse = document.getElementById('shower-your-use');
    const faucetYourUse = document.getElementById('faucet-your-use');
    const cwYourUse = document.getElementById('cw-your-use');
    const hwYourUse = document.getElementById('hw-your-use');

    const toiletAvgUse = document.getElementById('toilet-avg-use');
    const showerAvgUse = document.getElementById('shower-avg-use');
    const faucetAvgUse = document.getElementById('faucet-avg-use');
    const cwAvgUse = document.getElementById('cw-avg-use');
    const hwAvgUse = document.getElementById('hw-avg-use');

    const toiletSave = document.getElementById('toilet-save');
    const showerSave = document.getElementById('shower-save');
    const faucetSave = document.getElementById('faucet-save');
    const cwSave = document.getElementById('cw-save');
    const hwSave = document.getElementById('hw-save');

    toiletYourUse.textContent = Math.round(toiletWaterUseDaily);
    showerYourUse.textContent = Math.round(showerWaterUseDaily);
    faucetYourUse.textContent = Math.round(faucetWaterUseDaily);
    cwYourUse.textContent = Math.round(cwWaterUseDaily);
    hwYourUse.textContent = Math.round(hwWaterUseDaily);

    toiletAvgUse.textContent = Math.round(toiletWaterUseEco);
    showerAvgUse.textContent = Math.round(showerWaterUseEco);
    faucetAvgUse.textContent = Math.round(faucetWaterUseEco);
    cwAvgUse.textContent = Math.round(cwWaterUseEco);
    hwAvgUse.textContent = Math.round(hwWaterUseEco);

    toiletSave.textContent = Math.round(
      toiletWaterUseEco - toiletWaterUseDaily
    );
    showerSave.textContent = Math.round(
      showerWaterUseEco - showerWaterUseDaily
    );
    faucetSave.textContent = Math.round(
      faucetWaterUseEco - faucetWaterUseDaily
    );
    cwSave.textContent = Math.round(cwWaterUseEco - cwWaterUseDaily);
    hwSave.textContent = Math.round(hwWaterUseEco - hwWaterUseDaily);

    const waterSaved = document.getElementById('water-saved');
    waterSaved.textContent = Math.round(
      toiletWaterUseEco +
        showerWaterUseEco +
        faucetWaterUseEco +
        cwWaterUseEco +
        hwWaterUseEco -
        (toiletWaterUseDaily +
          showerWaterUseDaily +
          faucetWaterUseDaily +
          cwWaterUseDaily +
          hwWaterUseDaily)
    );
  });
}

start[0].addEventListener('click', () => hideStart());
