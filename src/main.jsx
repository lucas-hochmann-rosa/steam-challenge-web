import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Timer,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import './styles.css';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const sequenceChallenges = [
  { sequence: [2, 4, 6, 8], answer: 10, options: [6, 9, 10, 12], hint: 'Observe quanto aumenta de um termo para o próximo.' },
  { sequence: [5, 10, 15, 20], answer: 25, options: [22, 24, 25, 30], hint: 'A sequência avança sempre de cinco em cinco.' },
  { sequence: [3, 6, 9, 12], answer: 15, options: [13, 14, 15, 18], hint: 'Procure os múltiplos de 3.' },
  { sequence: [1, 4, 7, 10], answer: 13, options: [11, 12, 13, 14], hint: 'A diferença entre termos consecutivos é constante.' },
  { sequence: [20, 18, 16, 14], answer: 12, options: [10, 11, 12, 13], hint: 'Desta vez, os números estão diminuindo.' },
  { sequence: [2, 4, 8, 16], answer: 32, options: [20, 24, 30, 32], hint: 'Cada termo é duas vezes o anterior.' },
  { sequence: [1, 4, 9, 16], answer: 25, options: [20, 24, 25, 36], hint: 'Pense nos quadrados de 1, 2, 3 e 4.' },
  { sequence: [30, 25, 20, 15], answer: 10, options: [5, 8, 10, 12], hint: 'Retire a mesma quantidade a cada passo.' },
  { sequence: [1, 2, 3, 5], answer: 8, options: [6, 7, 8, 10], hint: 'Cada termo nasce da soma dos dois anteriores.' },
  { sequence: [81, 27, 9, 3], answer: 1, options: [0, 1, 2, 6], hint: 'Cada número é a terça parte do anterior.' },
  { sequence: [2, 5, 4, 7, 6], answer: 9, options: [8, 9, 10, 11], hint: 'As operações alternam: some três e depois tire um.' },
  { sequence: [4, 8, 12, 16], answer: 20, options: [18, 19, 20, 24], hint: 'Observe os múltiplos de quatro.' },
];

const expressionChallenges = [
  { numbers: [2, 3, 4, 5], target: 19, solution: '5 × 4 + 2 − 3', hint: 'Uma multiplicação pode aproximar você rapidamente de 19.' },
  { numbers: [3, 4, 6, 8], target: 22, solution: '8 × 3 + 4 − 6', hint: 'Experimente multiplicar o maior número pelo menor ímpar.' },
  { numbers: [1, 3, 6, 8], target: 19, solution: '8 × 3 − 6 + 1', hint: 'Comece formando um resultado um pouco maior que 19.' },
  { numbers: [2, 4, 6, 9], target: 28, solution: '9 × 4 − 6 − 2', hint: '9 × 4 é um bom ponto de partida.' },
  { numbers: [3, 5, 7, 8], target: 36, solution: '8 × 5 − 7 + 3', hint: 'Tente chegar a 40 antes de ajustar o resultado.' },
  { numbers: [4, 5, 6, 8], target: 28, solution: '8 × 6 − 5 × 4', hint: 'Dois produtos podem ser mais úteis que uma soma.' },
  { numbers: [2, 5, 6, 7], target: 32, solution: '7 × 6 − 5 × 2', hint: 'Tente ultrapassar 32 e depois subtrair.' },
  { numbers: [2, 4, 8, 9], target: 20, solution: '( 8 ÷ 4 ) × 9 + 2', hint: 'Uma divisão simples pode transformar dois números em 2.' },
  { numbers: [3, 4, 5, 9], target: 18, solution: '9 × 3 − 5 − 4', hint: 'Comece chegando a 27.' },
  { numbers: [1, 4, 7, 9], target: 30, solution: '9 × 4 − 7 + 1', hint: 'Comece com 9 × 4 e ajuste o resultado.' },
  { numbers: [2, 5, 8, 9], target: 24, solution: '9 + 8 + 5 + 2', hint: 'Nem sempre é necessário multiplicar.' },
  { numbers: [3, 6, 7, 10], target: 31, solution: '10 × 3 + 7 − 6', hint: 'Chegue a 30 antes de usar os dois últimos números.' },
  { numbers: [2, 4, 7, 8], target: 27, solution: '8 × 4 − 7 + 2', hint: 'Comece ultrapassando o objetivo.' },
];

const vaultChallenges = [
  {
    code: '246',
    clues: ['O primeiro é o único número primo par.', 'O segundo é o dobro do primeiro.', 'O terceiro é a soma dos dois primeiros.'],
    hint: 'Comece pelo único número primo que também é par.',
    validate: (first, second, third) => first === 2 && second === first * 2 && third === first + second,
  },
  {
    code: '358',
    clues: ['O primeiro é o único primo entre 2 e 4.', 'O segundo é 2 unidades maior que o primeiro.', 'O terceiro é 3 unidades maior que o segundo.'],
    hint: 'Depois de descobrir o primeiro algarismo, as outras pistas viram somas diretas.',
    validate: (first, second, third) => first === 3 && second === first + 2 && third === second + 3,
  },
  {
    code: '672',
    clues: ['O primeiro é o único número perfeito de um algarismo.', 'O segundo vem imediatamente depois do primeiro.', 'O terceiro é o menor número primo.'],
    hint: 'Número perfeito é aquele cuja soma dos divisores próprios resulta nele mesmo.',
    validate: (first, second, third) => first === 6 && second === first + 1 && third === 2,
  },
  {
    code: '936',
    clues: ['O primeiro é o maior quadrado perfeito de um algarismo.', 'O segundo é a raiz quadrada do primeiro.', 'O terceiro é o dobro do segundo.'],
    hint: 'Procure primeiro o maior quadrado perfeito menor que 10.',
    validate: (first, second, third) => first === 9 && second === 3 && third === second * 2,
  },
  {
    code: '527',
    clues: ['O primeiro é o único primo entre 4 e 6.', 'O segundo é o único primo par.', 'O terceiro é a soma dos dois primeiros.'],
    hint: 'Dois primos conhecidos formam o terceiro algarismo.',
    validate: (first, second, third) => first === 5 && second === 2 && third === first + second,
  },
  {
    code: '819',
    clues: ['O primeiro é o único cubo perfeito entre 7 e 9.', 'O segundo é o menor quadrado perfeito positivo.', 'O terceiro é a soma dos dois primeiros.'],
    hint: 'Pense em 2 ao cubo e depois no primeiro quadrado positivo.',
    validate: (first, second, third) => first === 8 && second === 1 && third === first + second,
  },
  {
    code: '435',
    clues: ['O primeiro é o único composto entre 3 e 5.', 'O segundo é o maior divisor primo do primeiro, mais 1.', 'O terceiro é a soma dos dois primeiros menos 2.'],
    hint: 'Um número composto tem mais de dois divisores positivos.',
    validate: (first, second, third) => first === 4 && second === 3 && third === first + second - 2,
  },
  {
    code: '729',
    clues: ['O primeiro é o maior número primo de um algarismo.', 'O segundo é o menor número primo.', 'O terceiro é a soma dos dois primeiros.'],
    hint: 'Comece pelos extremos dos primos de um algarismo.',
    validate: (first, second, third) => first === 7 && second === 2 && third === first + second,
  },
  {
    code: '483',
    clues: ['O primeiro é o menor quadrado perfeito par maior que 1.', 'O segundo é o dobro do primeiro.', 'O terceiro é o menor número primo ímpar.'],
    hint: 'O primeiro número também aparece em 2 × 2.',
    validate: (first, second, third) => first === 4 && second === 8 && third === 3,
  },
  {
    code: '684',
    clues: ['O primeiro é o único número perfeito de um algarismo.', 'O segundo é duas unidades maior que o primeiro.', 'O terceiro é a metade do segundo.'],
    hint: 'Depois do primeiro algarismo, pense em +2 e metade.',
    validate: (first, second, third) => first === 6 && second === first + 2 && third === second / 2,
  },
  {
    code: '347',
    clues: ['O primeiro é o único primo entre 2 e 4.', 'O segundo é o número composto imediatamente seguinte.', 'O terceiro é a soma dos dois primeiros.'],
    hint: 'A terceira pista confirma a soma dos dois primeiros algarismos.',
    validate: (first, second, third) => first === 3 && second === 4 && third === first + second,
  },
];

const trickSteps = [
  ['Pense em qualquer número.', 'Não conte para ninguém.'],
  ['Multiplique esse número por 2.', 'Guarde o novo resultado.'],
  ['Some 14 ao resultado.', 'Mais um passo...'],
  ['Divida o total por 2.', 'Estamos quase lá.'],
  ['Subtraia o número que você pensou no início.', 'Concentre-se no resultado.'],
];

const levelInfo = {
  easy: ['Ache o número', 'Identifique o padrão e complete a sequência.', 'Escolha uma peça e encaixe no espaço vazio.', '1 — 3 — 5 — ? → 7', '30 segundos'],
  medium: ['Chegue ao número', 'Construa uma expressão que alcance o objetivo.', 'Use todos os números exatamente uma vez. Operadores podem se repetir.', '2, 3, 5 e 6 → 6 × 3 − 5 + 2 = 15', '60 segundos'],
  hard: ['O cofre dos números', 'Use as pistas para encontrar a senha.', 'Preencha os três algarismos na ordem correta.', 'Par, dobro, soma → 2 · 4 · 6', '90 segundos'],
};

let audioContext = null;

function getAudioContext() {
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) return null;

  if (!audioContext || audioContext.state === 'closed') audioContext = new AudioContextType();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function playTone(type, enabled) {
  if (!enabled) return;

  const context = getAudioContext();
  if (!context) return;

  if (type === 'click') {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(520, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(420, startAt + 0.055);
    gain.gain.setValueAtTime(0.026, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.06);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.065);
    return;
  }

  const toneMap = {
    start: [440, 560, 620],
    step: [560],
    drop: [620],
    error: [170],
    correct: [740],
    victory: [523, 659, 784, 1047],
    vault: [392, 523, 659, 784],
    deadline: [330, 277, 220],
    gameover: [392, 370, 349, 294],
  };

  if (type === 'tick' || type === 'tickfast') {
    const repeats = type === 'tickfast' ? 2 : 1;
    Array.from({ length: repeats }).forEach((_, index) => {
      const startAt = context.currentTime + index * 0.12;
      const frameCount = Math.floor(context.sampleRate * 0.045);
      const buffer = context.createBuffer(1, frameCount, context.sampleRate);
      const data = buffer.getChannelData(0);

      for (let cursor = 0; cursor < frameCount; cursor += 1) {
        data[cursor] = (Math.random() * 2 - 1) * (1 - cursor / frameCount) ** 3;
      }

      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = buffer;
      filter.type = 'bandpass';
      filter.frequency.value = type === 'tickfast' ? 2400 : 1850;
      gain.gain.setValueAtTime(type === 'tickfast' ? 0.022 : 0.014, startAt);
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.045);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start(startAt);
    });
    return;
  }

  (toneMap[type] || [520]).forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime + index * (type === 'gameover' || type === 'deadline' ? 0.2 : 0.11);

    oscillator.type = type === 'gameover' || type === 'deadline' ? 'sawtooth' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(type === 'gameover' ? 0.035 : 0.05, startAt);
    gain.gain.exponentialRampToValueAtTime(0.001, startAt + 0.3);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.31);
  });
}

function evaluateExpression(parts) {
  const expression = parts.join('').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('−', '-');
  if (!/^[0-9+\-*/().]+$/.test(expression)) throw new Error('Símbolo inválido.');

  let cursor = 0;

  function readTerm() {
    let value = readFactor();
    while (expression[cursor] === '*' || expression[cursor] === '/') {
      const operator = expression[cursor];
      cursor += 1;
      const nextValue = readFactor();
      if (operator === '/' && nextValue === 0) throw new Error('Divisão por zero.');
      value = operator === '*' ? value * nextValue : value / nextValue;
    }
    return value;
  }

  function readExpression() {
    let value = readTerm();
    while (expression[cursor] === '+' || expression[cursor] === '-') {
      const operator = expression[cursor];
      cursor += 1;
      const nextValue = readTerm();
      value = operator === '+' ? value + nextValue : value - nextValue;
    }
    return value;
  }

  function readFactor() {
    if (expression[cursor] === '(') {
      cursor += 1;
      const value = readExpression();
      if (expression[cursor] !== ')') throw new Error('Confira os parênteses.');
      cursor += 1;
      return value;
    }

    const match = expression.slice(cursor).match(/^\d+/);
    if (!match) throw new Error('Expressão incompleta.');
    cursor += match[0].length;
    return Number(match[0]);
  }

  const result = readExpression();
  if (cursor !== expression.length || !Number.isFinite(result)) throw new Error('Expressão incompleta.');
  return result;
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function App() {
  const [screen, setScreen] = useState('welcome');
  const [trickStep, setTrickStep] = useState(0);
  const [level, setLevel] = useState(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedToken, setSelectedToken] = useState(null);
  const [answerSlots, setAnswerSlots] = useState([]);
  const [expressionParts, setExpressionParts] = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [lastAnswer, setLastAnswer] = useState('—');
  const [eligibleForPrize, setEligibleForPrize] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [surrendered, setSurrendered] = useState(false);
  const timerRef = useRef(null);

  const targetSeconds = level === 'easy' ? 30 : level === 'medium' ? 60 : 90;
  const challenge = useMemo(() => {
    if (level === 'easy') return sequenceChallenges[challengeIndex % sequenceChallenges.length];
    if (level === 'medium') return expressionChallenges[challengeIndex % expressionChallenges.length];
    return vaultChallenges[challengeIndex % vaultChallenges.length];
  }, [challengeIndex, level]);

  const canCheck =
    level === 'easy'
      ? answerSlots[0] != null
      : level === 'medium'
        ? challenge?.numbers.every((number) => expressionParts.includes(String(number)))
        : answerSlots.length === 3 && answerSlots.every((slot) => slot !== null);

  useEffect(() => {
    if (screen !== 'play') return undefined;

    timerRef.current = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timerRef.current);
  }, [screen]);

  useEffect(() => {
    function handleButtonClick(event) {
      if (event.target.closest('button')) playTone('click', soundEnabled);
    }

    document.addEventListener('click', handleButtonClick);
    return () => document.removeEventListener('click', handleButtonClick);
  }, [soundEnabled]);

  useEffect(() => {
    if (screen !== 'play' || elapsedSeconds === 0) return;
    if (elapsedSeconds === targetSeconds) {
      playTone('deadline', soundEnabled);
      setShowDeadlineModal(true);
      return;
    }
    if (elapsedSeconds < targetSeconds) playTone(elapsedSeconds >= targetSeconds - 10 ? 'tickfast' : 'tick', soundEnabled);
  }, [elapsedSeconds, screen, soundEnabled, targetSeconds]);

  function resetAttempt() {
    setElapsedSeconds(0);
    setAnswerSlots(level === 'hard' ? [null, null, null] : [null]);
    setExpressionParts([]);
    setFeedback('');
    setShowHint(false);
    setShowDeadlineModal(false);
    setSurrendered(false);
    setScreen('play');
    playTone('start', soundEnabled);
  }

  function chooseLevel(nextLevel) {
    const challengeCount = nextLevel === 'easy' ? sequenceChallenges.length : nextLevel === 'medium' ? expressionChallenges.length : vaultChallenges.length;
    setLevel(nextLevel);
    setEligibleForPrize(true);
    setShowHint(false);
    setShowDeadlineModal(false);
    setSurrendered(false);
    setChallengeIndex((current) => {
      let nextIndex = Math.floor(Math.random() * challengeCount);
      while (challengeCount > 1 && nextIndex === current % challengeCount) nextIndex = Math.floor(Math.random() * challengeCount);
      return nextIndex;
    });
    setScreen('brief');
  }

  function goHome() {
    setScreen('welcome');
    setTrickStep(0);
    setLevel(null);
    setAnswerSlots([]);
    setExpressionParts([]);
    setElapsedSeconds(0);
    setFeedback('');
    setSelectedToken(null);
    setEligibleForPrize(true);
  }

  function goBack() {
    if (screen === 'trick') {
      if (trickStep > 0) setTrickStep((current) => current - 1);
      else setScreen('welcome');
    } else if (screen === 'reveal') {
      setTrickStep(4);
      setScreen('trick');
    } else if (screen === 'explain') setScreen('reveal');
    else if (screen === 'choose') setScreen('explain');
    else if (screen === 'brief') setScreen('choose');
    else if (screen === 'play') setScreen('brief');
    else if (screen === 'failed' || screen === 'result') setScreen('choose');
    else if (screen === 'thanks') setScreen('result');
  }

  function placeToken(token, slotIndex = 0) {
    playTone('drop', soundEnabled);
    setSelectedToken(null);

    if (level === 'medium') {
      setExpressionParts((current) => [...current, token]);
      return;
    }

    setAnswerSlots((current) => {
      const nextSlots = [...current];
      nextSlots[slotIndex] = token;
      return nextSlots;
    });
  }

  function placeSelected(slotIndex = 0) {
    if (selectedToken) placeToken(selectedToken, slotIndex);
  }

  function finishAsCorrect(wonPrize) {
    playTone(wonPrize ? 'victory' : 'correct', soundEnabled);
    setScreen('result');
  }

  function finishAsFailed(answer = '—') {
    setLastAnswer(answer);
    setAnswerSlots([]);
    playTone('gameover', soundEnabled);
    setScreen('failed');
  }

  function surrender() {
    setSurrendered(true);
    setLastAnswer('—');
    setEligibleForPrize(false);
    playTone('gameover', soundEnabled);
    setScreen('failed');
  }

  function checkAnswer() {
    try {
      if (level === 'easy') {
        if (Number(answerSlots[0]) === challenge.answer) finishAsCorrect(eligibleForPrize && elapsedSeconds <= targetSeconds);
        else finishAsFailed(String(answerSlots[0]));
        return;
      }

      if (level === 'hard') {
        const digits = answerSlots.map(Number);
        const typedCode = answerSlots.join('');
        if (challenge.validate(...digits)) {
          playTone('vault', soundEnabled);
          finishAsCorrect(eligibleForPrize && elapsedSeconds <= targetSeconds);
        } else {
          finishAsFailed(typedCode);
        }
        return;
      }

      const usedNumbers = expressionParts.filter((part) => /^\d+$/.test(part)).map(Number).sort((left, right) => left - right);
      const expectedNumbers = [...challenge.numbers].sort((left, right) => left - right);
      if (JSON.stringify(usedNumbers) !== JSON.stringify(expectedNumbers)) {
        finishAsFailed('Expressão incompleta');
        return;
      }

      const result = evaluateExpression(expressionParts);
      if (Math.abs(result - challenge.target) < 1e-9) finishAsCorrect(eligibleForPrize && elapsedSeconds <= targetSeconds);
      else finishAsFailed(String(Number(result.toFixed(3))));
    } catch (error) {
      finishAsFailed(error.message || 'Resposta inválida');
    }
  }

  function renderToken(token, disabled = false) {
    return (
      <button
        key={token}
        className={`token ${selectedToken === token ? 'selected' : ''}`}
        disabled={disabled}
        draggable={!disabled}
        onClick={() => setSelectedToken(selectedToken === token ? null : token)}
        onDragStart={(event) => event.dataTransfer.setData('text/plain', token)}
      >
        {token}
      </button>
    );
  }

  return (
    <main className="shell" style={{ '--logo-mask-url': `url("${assetPath('/logo-escola-sesi.png')}")` }}>
      <MathBackground />
      <div className="rainbow" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <header>
        <img src={assetPath('/logo-escola-sesi.png')} alt="Escola SESI" />
        <nav>
          {screen !== 'welcome' && (
            <button className="navbtn" onClick={goBack} aria-label="Voltar">
              <ArrowLeft />
              <i>Voltar</i>
            </button>
          )}
          {screen === 'play' ? (
            <button className="navbtn" onClick={resetAttempt} aria-label="Reiniciar desafio">
              <RotateCcw />
              <i>Reiniciar</i>
            </button>
          ) : (
            screen !== 'welcome' && (
              <button className="navbtn" onClick={goHome} aria-label="Ir para o início">
                <Home />
                <i>Início</i>
              </button>
            )
          )}
        </nav>
        <div className="event-title">
          <span>Mostra</span>
          <strong className="steam-word">
            {'STEAM'.split('').map((letter) => (
              <i key={letter}>{letter}</i>
            ))}
          </strong>
          <span>2026</span>
        </div>
        <div className="class-number">302</div>
        <button className="audio" onClick={() => setSoundEnabled((enabled) => !enabled)} aria-label={soundEnabled ? 'Desativar sons' : 'Ativar sons'}>
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </button>
      </header>

      {screen === 'play' && (
        <div className={`clock ${elapsedSeconds > targetSeconds ? 'late' : ''}`}>
          <Timer />
          {formatTime(elapsedSeconds)}
          <small>/ {formatTime(targetSeconds)}</small>
        </div>
      )}

      <section className={`stage ${screen}`}>
        {screen === 'welcome' && (
          <>
            <h1>
              DESAFIO
              <br />
              <b>DOS NÚMEROS</b>
            </h1>
            <p className="lead">Uma experiência de lógica, estratégia e raciocínio matemático.</p>
            <div className="people">
              <ProfileCard image={assetPath('/augusto.png')} name="Augusto Belini" surname="Gasparetto" />
              <ProfileCard image={assetPath('/lucas.jpg')} name="Lucas Hochmann" surname="Rosa" />
              <ProfileCard image={assetPath('/maria.jpg')} name="Maria Paula" surname="Rossetti Siqueira" />
            </div>
            <p>Nós seremos seus guias nesta experiência.</p>
            <button
              className="primary"
              onClick={() => {
                setScreen('trick');
                playTone('start', soundEnabled);
              }}
            >
              COMEÇAR EXPERIÊNCIA <ArrowRight />
            </button>
          </>
        )}

        {screen === 'trick' && (
          <div className="panel">
            <div className="eyebrow">PASSO {trickStep + 1} DE 5</div>
            <div className="orb">{trickStep + 1}</div>
            <h2>{trickSteps[trickStep][0]}</h2>
            <p>{trickSteps[trickStep][1]}</p>
            <div className="dots">
              {trickSteps.map((_, index) => (
                <i key={index} className={index <= trickStep ? 'on' : ''} />
              ))}
            </div>
            <button
              className="primary"
              onClick={() => {
                playTone('step', soundEnabled);
                if (trickStep < 4) setTrickStep((current) => current + 1);
                else setScreen('reveal');
              }}
            >
              {trickStep < 4 ? 'PRÓXIMO PASSO' : 'VER RESULTADO'} <ArrowRight />
            </button>
          </div>
        )}

        {screen === 'reveal' && (
          <div className="panel">
            {trickStep === 7 ? (
              <>
                <div className="seven">7</div>
                <h2>O seu resultado é 7?</h2>
                <p>Não foi mágica. Foi matemática.</p>
                <button className="primary" onClick={() => setScreen('explain')}>
                  DESCOBRIR O SEGREDO <ArrowRight />
                </button>
              </>
            ) : (
              <>
                <h2>Eu já sei o seu resultado...</h2>
                <button
                  className="primary"
                  onClick={() => {
                    setTrickStep(7);
                    playTone('victory', soundEnabled);
                  }}
                >
                  REVELAR
                </button>
              </>
            )}
          </div>
        )}

        {screen === 'explain' && (
          <div className="panel explanation">
            <div className="eyebrow">O SEGREDO DO TRUQUE</div>
            <h2>Por que sempre dá 7?</h2>
            <div className="formula">
              {['n', '2n', '2n + 14', 'n + 7', '7'].map((item, index) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  {index < 4 && <b>→</b>}
                </React.Fragment>
              ))}
            </div>
            <p>Ao dividir por 2, o número inicial volta a aparecer junto de 7. Quando você subtrai o número inicial, ele se cancela e sobra apenas 7.</p>
            <button
              className="primary"
              onClick={() => {
                playTone('start', soundEnabled);
                setScreen('choose');
              }}
            >
              IR AOS DESAFIOS <ArrowRight />
            </button>
          </div>
        )}

        {screen === 'choose' && (
          <>
            <div className="eyebrow">ESCOLHA SUA DIFICULDADE</div>
            <h2>Qual nível você aceita?</h2>
            <div className="levels simple">
              <LevelButton number="01" label="FÁCIL" level="easy" onClick={() => chooseLevel('easy')} />
              <LevelButton number="02" label="MÉDIO" level="medium" onClick={() => chooseLevel('medium')} />
              <LevelButton number="03" label="DIFÍCIL" level="hard" onClick={() => chooseLevel('hard')} />
            </div>
          </>
        )}

        {screen === 'brief' && <Brief level={level} onStart={resetAttempt} />}

        {screen === 'play' && (
          <div className="panel game">
            <div className={`gamehead ${level}`}>
              <span>{level === 'easy' ? 'FÁCIL · ACHE O NÚMERO' : level === 'medium' ? 'MÉDIO · CHEGUE AO NÚMERO' : 'DIFÍCIL · O COFRE DOS NÚMEROS'}</span>
            </div>

            {level === 'easy' && (
              <>
                <h2>Qual número vem a seguir?</h2>
                <div className="sequence">
                  {challenge.sequence.map((number) => (
                    <span key={number}>{number}</span>
                  ))}
                  <button
                    className="slot"
                    onDrop={(event) => placeToken(event.dataTransfer.getData('text/plain'))}
                    onDragOver={(event) => event.preventDefault()}
                    onClick={() => placeSelected()}
                  >
                    {answerSlots[0] ?? '?'}
                  </button>
                </div>
                <div className="tray">{challenge.options.map((number) => renderToken(String(number)))}</div>
              </>
            )}

            {level === 'medium' && (
              <>
                <div className="target">
                  🎯 OBJETIVO <b>{challenge.target}</b>
                </div>
                <p>Use todos os quatro números exatamente uma vez.</p>
                <div
                  className="expression"
                  onDrop={(event) => placeToken(event.dataTransfer.getData('text/plain'))}
                  onDragOver={(event) => event.preventDefault()}
                  onClick={() => placeSelected()}
                >
                  {expressionParts.length ? (
                    expressionParts.map((part, index) => (
                      <button key={`${part}-${index}`} onClick={() => setExpressionParts((current) => current.filter((_, cursor) => cursor !== index))}>
                        {part}
                      </button>
                    ))
                  ) : (
                    <span>Toque ou arraste as peças para cá</span>
                  )}
                </div>
                <div className="tray">{challenge.numbers.map((number) => renderToken(String(number), expressionParts.includes(String(number))))}</div>
                <div className="tray ops">{['+', '−', '×', '÷', '(', ')'].map((operator) => renderToken(operator))}</div>
                <button className="clear" onClick={() => setExpressionParts([])}>
                  <RotateCcw /> Limpar expressão
                </button>
              </>
            )}

            {level === 'hard' && (
              <>
                <div className="vault">
                  <LockKeyhole />
                  <div>
                    {[0, 1, 2].map((slotIndex) => (
                      <button
                        key={slotIndex}
                        className="slot"
                        onDrop={(event) => placeToken(event.dataTransfer.getData('text/plain'), slotIndex)}
                        onDragOver={(event) => event.preventDefault()}
                        onClick={() => placeSelected(slotIndex)}
                      >
                        {answerSlots[slotIndex] ?? '—'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="clues">
                  {challenge.clues.map((clue, index) => (
                    <p key={clue}>
                      <b>0{index + 1}</b>
                      {clue}
                    </p>
                  ))}
                </div>
                <div className="tray digits">{'0123456789'.split('').map((digit) => renderToken(digit))}</div>
              </>
            )}

            <button className={`hint-button ${showHint ? 'active' : ''}`} onClick={() => setShowHint((visible) => !visible)}>
              <Lightbulb /> {showHint ? 'OCULTAR DICA' : 'REVELAR DICA'}
            </button>
            {showHint && <div className="hint-box">{level === 'hard' ? 'Comece pela primeira pista: ela identifica um único algarismo. Resolva uma posição de cada vez.' : challenge.hint}</div>}
            {feedback && <div className="feedback">{feedback}</div>}
            <div className="challenge-actions">
              <button className="secondary surrender" onClick={surrender}>
                DESISTIR
              </button>
              {canCheck && (
                <button className="primary check" onClick={checkAnswer}>
                  {level === 'hard' ? 'DESBLOQUEAR' : 'VERIFICAR RESPOSTA'}
                </button>
              )}
            </div>
          </div>
        )}

        {screen === 'failed' && (
          <div className="panel failed">
            <div className="gameover">{surrendered ? 'DESAFIO ENCERRADO' : 'TENTATIVA ENCERRADA'}</div>
            <h2>{surrendered ? 'Você desistiu do desafio.' : 'Não foi dessa vez.'}</h2>
            <p>{surrendered ? 'Tudo bem. Você pode iniciar uma nova tentativa para descobrir a resposta.' : 'A primeira verificação encerra a tentativa para manter a dinâmica rápida.'}</p>
            {!surrendered && (
              <div className="attempt-review">
                <article>
                  <small>{level === 'hard' ? 'SUA SENHA' : level === 'medium' ? 'SUA EXPRESSÃO' : 'SUA RESPOSTA'}</small>
                  <b>{level === 'medium' ? expressionParts.join(' ') || '—' : lastAnswer}</b>
                  {level === 'medium' && <span>Resultado: {lastAnswer}</span>}
                </article>
                <article>
                  <small>{level === 'hard' ? 'SENHA CORRETA' : level === 'medium' ? 'UMA SOLUÇÃO CORRETA' : 'RESPOSTA CORRETA'}</small>
                  <b>{level === 'hard' ? challenge.code : level === 'medium' ? `${challenge.solution} = ${challenge.target}` : challenge.answer}</b>
                  <span>{level === 'hard' ? 'Reveja as pistas na nova tentativa.' : 'A lógica fica mais clara quando você compara as etapas.'}</span>
                </article>
              </div>
            )}
            {!surrendered && <p className="no-prize">Uma nova tentativa não valerá premiação.</p>}
            <div className="actions">
              <button className="secondary" onClick={() => setScreen('thanks')}>
                ENCERRAR
              </button>
              <button
                className="primary"
                onClick={() => {
                  setEligibleForPrize(false);
                  resetAttempt();
                }}
              >
                TENTAR NOVAMENTE <ArrowRight />
              </button>
            </div>
          </div>
        )}

        {screen === 'result' && (
          <div className="panel result">
            <Trophy />
            <div className="eyebrow">{eligibleForPrize && elapsedSeconds <= targetSeconds ? 'META ALCANÇADA' : 'DESAFIO FINALIZADO'}</div>
            <h2>{eligibleForPrize && elapsedSeconds <= targetSeconds ? 'VOCÊ VENCEU!' : 'DESAFIO CONCLUÍDO!'}</h2>
            <p>
              {eligibleForPrize && elapsedSeconds <= targetSeconds
                ? 'Premiação conquistada.'
                : eligibleForPrize
                  ? 'Você encontrou a resposta, mas ultrapassou o tempo-alvo.'
                  : 'Resposta correta na nova tentativa.'}
            </p>
            <div className="score">
              <div>
                <small>SEU TEMPO</small>
                <b>{formatTime(elapsedSeconds)}</b>
              </div>
              <div>
                <small>TEMPO-ALVO</small>
                <b>{formatTime(targetSeconds)}</b>
              </div>
            </div>
            <strong>{eligibleForPrize && elapsedSeconds <= targetSeconds ? '🏆 PREMIAÇÃO CONQUISTADA' : 'SEM PREMIAÇÃO'}</strong>
            <button className="primary" onClick={() => setScreen('thanks')}>
              CONTINUAR <ArrowRight />
            </button>
          </div>
        )}

        {screen === 'thanks' && (
          <div className="panel">
            <div className="orb">7</div>
            <div className="eyebrow">EXPERIÊNCIA CONCLUÍDA</div>
            <h2>Obrigado por participar!</h2>
            <p>Os números estão em todos os lugares. O desafio é descobrir o que eles podem fazer.</p>
            <button className="primary" onClick={goHome}>
              CONCLUIR EXPERIÊNCIA <ArrowRight />
            </button>
          </div>
        )}
      </section>

      {showDeadlineModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="time-title">
          <div className="time-dialog">
            <Timer />
            <div className="eyebrow">TEMPO-ALVO ATINGIDO</div>
            <h2 id="time-title">O tempo encerrou.</h2>
            <p>Você pode continuar resolvendo o desafio, mas a tentativa não valerá premiação.</p>
            <div className="actions">
              <button
                className="secondary"
                onClick={() => {
                  setShowDeadlineModal(false);
                  setEligibleForPrize(false);
                  setScreen('thanks');
                }}
              >
                ENCERRAR
              </button>
              <button
                className="primary"
                onClick={() => {
                  setShowDeadlineModal(false);
                  setEligibleForPrize(false);
                }}
              >
                CONTINUAR DESAFIO <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function MathBackground() {
  return (
    <div className="math-bg" aria-hidden="true">
      <img src={assetPath('/math-icons/calculadora.png')} alt="" />
      <img src={assetPath('/math-icons/operacoes.png')} alt="" />
      <img src={assetPath('/math-icons/grafico.png')} alt="" />
      <img src={assetPath('/math-icons/dados.png')} alt="" />
      <img src={assetPath('/math-icons/abaco.png')} alt="" />
      <div className="math-logo" />
    </div>
  );
}

function ProfileCard({ image, name, surname }) {
  return (
    <figure>
      <img src={image} alt="" />
      <figcaption>
        {name}
        <br />
        {surname}
      </figcaption>
    </figure>
  );
}

function LevelButton({ number, label, level, onClick }) {
  return (
    <button className={level} onClick={onClick}>
      <b>{number}</b>
      <strong>{label}</strong>
      <ArrowRight />
    </button>
  );
}

function Brief({ level, onStart }) {
  const info = levelInfo[level];

  return (
    <div className={`panel brief ${level}`}>
      <div className="eyebrow">ANTES DE COMEÇAR</div>
      <h2>{info[0]}</h2>
      <div className="briefgrid">
        {['OBJETIVO', 'REGRAS', 'EXEMPLO', 'TEMPO-ALVO'].map((label, index) => (
          <article key={label}>
            <small>{label}</small>
            <p>{info[index + 1]}</p>
          </article>
        ))}
      </div>
      <p>O cronômetro começa somente ao tocar no botão.</p>
      <button className="primary" onClick={onStart}>
        INICIAR DESAFIO <ArrowRight />
      </button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
