// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const probabilidad = [
    'Muy bien changer, ¿Qué probabilidad hay de que mañana no compres envases de plástico? A las tres me dices el número. Uno, dos, tres.',
    'Empecemos, ¿Qué probabilidad hay de separar tus residuos para reciclar durante una semana? ; A las tres dices el número. Uno, dos, tres.',
    'Excelente changer, ¿Qué probabilidad hay de bañarte en 5 minutos durante todo el mes para ahorrar agua?; A las tres me dices el número, Uno,dos,tres.',
    'Genial, ¿Qué probabilidad hay de que a partir de ahora lleves bolsas de tela al super?; a las tres dices el número, uno,dos,tres',
    'Ok. ¿Que probabilidad hay de que el lunes uses el transporte publico para ir a tu escuela o trabajo? A la de tres me dices tu numero, uno, dos, tres',


    ];
    
const trivia = [
    'Vamos a jugar, ¿Cuál es el país más contaminado actualmente? A, México, B, China o C, Bangladés',
    '¿Qué material es que se puede reciclar 11 veces? A, Aluminio, B, Plástico, C, Papel',
    '¿Qué país es el que ha apoyado en contra el cambio climático creando un panda con paneles de energía solar? A, corea del norte, B, china o C, japón',
    
    ];
    
    var trivia2 = [
        {
            pregunta:"Vamos a jugar, ¿Cuál es el país más contaminado actualmente?",
            respuestaA: "mexico",
            respuestaB: "monterrey",
            respuestaC: "banglades"
        },
        {
            pregunta: "¿Qué material es que se puede reciclar 11 veces?",
            respuestaA: "aluminio",
            respuestaB: "plastico",
            respuestaC: "papel"
        },
        {
            pregunta:"¿Qué país es el que ha apoyado en contra el cambio climático creando un panda con paneles de energía solar?",
            respuestaA: "corea del norte",
            respuestaB: "china",
            respuestaC: "japon",
        }
        ];
        
        var num = Math.floor(Math.random()*trivia2.length);
        var respuesta1 = trivia2[num].respuestaA;
        var respuesta2 = trivia2[num].respuestaB;
        var respuesta3 = trivia2[num].respuestaC;
        
        
    
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola changer, Bienvenido, ¡Vamos a jugar, elige! ¿Trivia? o ¿qué probabilidad?';
        const speakrepromt = '¿Hola, sigues ahi? ¿Trivia? o ¿qué probabilidad?';
        return handlerInput.responseBuilder
            .speak(speakOutput + "Para hacer otro reto menciona, que probabilidad o trivia")
            .reprompt(speakrepromt)
            .getResponse();
    }
};

const juegoProbabilidadIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'juegoProbabilidadIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = probabilidad  [Math.floor(Math.random()*probabilidad.length)]
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const juegoTriviaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'juegoTriviaIntent';
    },
    handle(handlerInput) {
        
        const speakOutput = trivia2[num].pregunta + ", las posibles respuestas son " + respuesta1 + ", " + respuesta2 + " y " + respuesta3;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const respuestasHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'respuestasIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var respuesta = request.intent.slots.numeros.value;
        var speakOutput="";
        if(respuesta1===respuesta){
         speakOutput = "tu respuesta es correcta, para seguir jugando dime trivia, que probabilidad o salir";   
        }else{
            speakOutput = "tu respuesta es incorrecta, dime otra respuesta o dime que probabilidad, trivia para seguir jugando o salir";
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const NumeroAlexaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'NumeroAlexaIntent';
    },
    handle(handlerInput) {
            const request = handlerInput.requestEnvelope.request;
            var num = request.intent.slots.numero.value;
            
            var AlexaNum = ['Uno','Dos','Tres']
            var AlexaNumRandom = AlexaNum [Math.floor(Math.random()*AlexaNum.length)]
            var speakOutput = "";
            
            if(num === AlexaNumRandom){
                speakOutput = AlexaNumRandom + ",ups Perdiste, lo bueno que ahora contribuiras con un pequeño cambio para mejorar el mundo, ¿Quieres seguir jugando o quieres salir?"
            }else{
                speakOutput = AlexaNumRandom + ",creo que te salvaste por esta ocasión, ¿Para seguir jugando dime, que probabilidad o trivia, sino, dime salir o terminar? "
            }
            
            
    return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Aquí podrás aprender sobre como cuidar el medio ambiente, con dos juegos, elige tu favorito ¿Trivia? o ¿Qué probabilidad?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adiós, gracias por jugar y aprender sobre el cambio climático conmigo, invita a tus amigos a jugar también. ¡Nos vemos! ';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        respuestasHandler,
        NumeroAlexaIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        juegoProbabilidadIntentHandler,
        juegoTriviaIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
        // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
