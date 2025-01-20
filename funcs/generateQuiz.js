const randomNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const opObj = {
    1: '+',
    2: '-',
    3: '*',
    4: '/'
};

const randOptionLogic = {
    1: (result) => result + randomNum(1, 10),
    2: (result) => result - randomNum(1, 10),
    3: (result) => result + randomNum(1, 5),
    4: (result) => result - randomNum(1, 5)
};

const generateSingleQuiz = (level) => {
    let numRange, operations;

    switch (level) {
        case 'beginner':
            numRange = [1, 10];
            operations = [1, 2, 3, 4];
            break;
        case 'easy':
            numRange = [1, 20];
            operations = [1, 2, 3, 4];
            break;
        case 'intermediate':
            numRange = [20, 80];
            operations = [1, 2, 3, 4];
            break;
        case 'expert':
            numRange = [50, 200];
            operations = [1, 2, 3, 4];
            break;
        default:
            throw new Error('Invalid level');
    }

    const num1 = randomNum(numRange[0], numRange[1]);
    const num2 = randomNum(numRange[0], numRange[1]);
    const op = operations[randomNum(0, operations.length - 1)];
    const question = `${num1} ${opObj[op]} ${num2}`;
    let result = eval(question);

    if (op === 4 && num2 !== 0) {
        result = parseFloat(result.toFixed(2));
    } else if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(2));
    }

    const correctAnswer = result.toString();

    const options = new Set();
    options.add(correctAnswer);

    while (options.size < 4) {
        const randomLogicFunction = randOptionLogic[randomNum(1, 4)];
        const generatedOption = randomLogicFunction(result);

        let optionValue = generatedOption;
        if (optionValue % 1 !== 0) {
            optionValue = parseFloat(optionValue.toFixed(2));
        }

        options.add(optionValue.toString());
    }

    const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

    return {
        question,
        answer: correctAnswer,
        options: shuffledOptions
    };
};

const generateQuizzes = (count, level) => {
    const quizzes = [];
    for (let i = 0; i < count; i++) {
        quizzes.push(generateSingleQuiz(level));
    }
    return quizzes;
};

module.exports = generateQuizzes;
