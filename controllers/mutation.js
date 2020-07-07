
const { ADN_WORD, ADN_REGEX } = require('../config/config');
const MutationDB = require('../models/mutation');

// funtion callback of the states mutation
function mutation(req, res) {
    const {dna} = req.body;

    if(!isMatrizValid(dna)) {
        return res.status(500).json({
            success: false,
            message: 'the dna matrix is ​​not valid'
        });
    }

    if(!isBaseValid(dna)) {
        return res.status(500).json({
                success: false,
                message: 'the nitrogen base of DNA is not valid'
            });
    }

    const isMutation = hasMutation(dna || []);
    saveADN(isMutation, dna.toString());
    if(isMutation) {
        res.status(200).json({
            success: true,
          });
    } else {
        res.status(403).json({
            success: false,
            });
    }
}

// funtion callback of the states service
async function stats(req, res) {
    
    MutationDB.find()

    try {
        const mutatios = await MutationDB.find().exec();

        const countMutacion = mutatios.filter(s => s.isMutation == true).length;
        const countNoMutacion = mutatios.filter(s => s.isMutation == false).length;
        res.status(200).json({
            count_mutations: countMutacion,
            count_no_mutation: countNoMutacion,
            ratio: countMutacion > 0 ? countMutacion/countNoMutacion : 0
            });
      } catch (err) {
        res.status(500).json({
            err
            });
      }
}

// function whose purpose is to save the analyzed DNA
function saveADN(isMutation, adn) {
    const mutationDB = new MutationDB();
    mutationDB.isMutation = isMutation;
    mutationDB.adn = adn;
    mutationDB.save((err, mutationStore) => {
        console.log('err',err);
    });
}

// function that has the purpose of verifying if the DNA has a mutation
function hasMutation(data) {
    let coincidences = 0;
    const dataCompare = getDataCompare(data);
    
    ADN_WORD.forEach(word => {
        dataCompare.forEach(sequence => {
            const count = (sequence.match(word) || []).length;
            if(count >= 4) {
                coincidences++;
            }
        });
    });
    //console.log('coincidences', coincidences);
    
    return coincidences > 1;
}

// function whose purpose is to obtain all the string, verticals, horizontals and diagonals of the DNA sequence
function getDataCompare(data) {
    const lengthRow = data[0].length;
    const dataCompare = [];
    dataCompare.concat(data);

    for(let index=0; index<lengthRow; index++) {
        let concat = '';
        for(let item in data) {
            concat+=data[item][index];
        }
        dataCompare.push(concat);
    }

    //up /
    for(let y=0; y<lengthRow; y++) {
        let concat = '';
        let aux = 0;

        if(lengthRow-y >= 4) {
            for(let x=0; x<lengthRow-y; x++) {
                concat += data[x][y+aux];
                aux++;
            }
            if(!dataCompare.includes(concat))
                dataCompare.push(concat);
        }
    }

    //down /
    for(let y=0; y<lengthRow; y++) {
        let concat = '';
        let aux = 0;

        if(lengthRow-y >= 4) {
            for(let x=y; x<lengthRow; x++) {
                concat += data[x][aux];
                aux++;
            }
            if(!dataCompare.includes(concat))
                dataCompare.push(concat);
        }
    }

    //up \
    for(let y=0; y<lengthRow; y++) {
        let concat = '';
        let aux = 0;
        if((lengthRow)-y >= 4) {
            for(let x=(lengthRow-1); x>=y; x--) {
                concat += data[x][y+aux];
                aux++;
            }
            if(!dataCompare.includes(concat))
                dataCompare.push(concat);
        }
    }

    //up \
    for(let y=0; y<lengthRow; y++) {
        let concat = '';
        let aux = 0;

        if((lengthRow)-y >= 4) {
            for(let x=(lengthRow-1); x>=y; x--) {
                concat += data[x-y][aux];
                aux++;
            }
            if(!dataCompare.includes(concat))
                dataCompare.push(concat);
        }
    }
    //console.log(dataCompare);
    
    return dataCompare;
}

// function that has the purpose of verifying if the nitrogenous base is valid
function isBaseValid(data) {
    const reg = new RegExp(ADN_REGEX);
    let isValid = true;
    data.forEach(element => {
        const res = element.split('').filter(char => { return reg.test(char) == false });
        if(res.length > 0) {
            isValid = false;
            return;
        }
    });
    return isValid;
}

// function whose purpose is to validate if the matrix is ​​correct
function isMatrizValid(data) {
    const lengthMatriz = data.length;
    let isValid = true;

    data.forEach(element => {
        if(element.length != lengthMatriz) {
            isValid = false;
            return;
        }
    });

    return isValid;
}

module.exports = {
    mutation,
    stats
};