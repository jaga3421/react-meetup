export default {
  "intro": {
    "title": "Face Detection in React with TensorFlow.js (face-api)",
    "author": "Jagadeesh Jayachandran | React Bangalore",
    "social": [
      {
        "icon": "FaLinkedin",
        "content": "/in/jjayy",
        "url": "https://www.linkedin.com/in/jjayy"
      },
      {
        "icon": "FaGithub",
        "content": "/jaga3421",
        "url": "https://www.github.com/jaga3421"
      },
      {
        "icon": "FaLink",
        "content": "ja.gadee.sh",
        "url": "https://ja.gadee.sh"
      }
    ]
  },
    "agenda": {
      "id": "agenda",
      "title": "Talk Agenda",
      "subtitles": [
        "What is TensorFlow?",
        "Why Face Detection?",
        "A quick demo",
        "Face-api.js Deep Dive",
        "Privacy and Ethical Considerations",
        "Q&A"
      ]
    },


    "whatIsTensorFlow": {
      "id": "whatIsTensorFlow",
      "title": "What is TensorFlow?",
      "horizandalSubSlides": [
        {
          "title": "The Basics",
          "list": 
          [
            {
              "title": "What is TensorFlow?",
              "content": "Open-source machine learning framework developed by Google for building and training machine learning models."
            },
            {
              "title": "How does TensorFlow work?",
              "content": "TensorFlow uses tensors (multi-dimensional arrays) to represent data, and computational graphs to define operations on this data."
            },
            {
              "title": "Why is TensorFlow popular?",
              "content": "Due to its flexibility, scalability, and ability to run on various platforms (CPU, GPU, mobile). Large community, extensive documentation, and high-level APIs"
            }
          ]
        },
        {
          "title": "Core Concepts",
          "list": [
            {
              "title": "Tensors and Variables",
              "content": "Tensors are multi-dimensional arrays used to store data in TensorFlow. Variables are mutable tensors that hold and update data, such as weights in a neural network during training."
            },
            {
              "title": "Graphs and Operations (Ops)",
              "content": "Graphs define the flow of data and operations in a model, where operations (or 'ops') are the mathematical computations performed on tensors, like addition, multiplication, etc."
            },
            {
              "title": "Sessions and Keras",
              "content": "A session executes the operations defined in a graph. Keras is a high-level API in TensorFlow that simplifies defining, training, and evaluating models by abstracting complex tasks like layer creation and model training."
            }
          ]
        },

        {
          "title": "TensorFlow.js",
          "list": [
            {
              "title": "What is TensorFlow.js?",
              "content": "TensorFlow.js is a JavaScript library for defining, training, and running machine learning models directly in the browser or Node.js, enabling web developers to integrate machine learning into applications."
            },
            {
              "title": "How TensorFlow.js Works?",
              "content": "It uses tensors and computational graphs, similar to TensorFlow, allowing machine learning models to run in the browser or server-side without requiring additional infrastructure."
            },
            {
              "title": "Why Use TensorFlow.js?",
              "content": "It enables real-time, client-side processing with GPU support, making machine learning interactive and efficient directly within web apps."
            }
          ]
        }

      ]
    },

    "whyFaceDetection": {
      "id": "whyFaceDetection",
      "title": "Why Face Detection?",
      "horizandalSubSlides": [
        {
          "title": "Webcam Detection",
          "content": "Companies like Hackerrank, Uplers, and Turing use face detection for verifying candidates during remote assessments and interviews."
        },
        {
          "title": "User Authentication",
          "content": "Face detection is increasingly used in web applications for secure user authentication, enabling password-free logins and biometric verification."
        },
        {
          "title": "Marketing",
          "content": "Face detection is used in marketing for analyzing customer reactions and behavior, improving advertisements, and personalized marketing strategies."
        },
        {
          "title": "Future Applications",
          "content": "Personalized User Experiences, Web Accessibility, Virtual and Augmented Reality"
        }
      ]
    },

    "demo": {
      "id": "demo",
      "title": "Lets see it in action?",
      "horizandalSubSlides": []
    },

    "reactTensor": {
      "id": "reactTensor",
      "title": "Building with React and face-api.js",
      "horizandalSubSlides": [

        {
          "title": "What just happened?",
          "list": 
          [
            {
              "title": "Get Video Stream",
              "content": "Get access to the webcam and stream the video"
            },
            {
              "title": "Get Face Models",
              "content": "Download the face detection models from face-api.js. They can be downloaded to your public folder or use the CDN link."
            },
            {
              "title": "Detect Face",
              "content": "Detect faces in the video stream"
            },
            {
              "title": "Draw on Canvas",
              "content": "Draw the detections on a canvas element using face-api.js"
            }
          ]
        },
        {
          "title": "The face-api.js",
          "list": 
          [
            {
              "title": "What is it?",
              "content": "A JavaScript library built on top of TensorFlow.js for face detection and recognition, providing pre-trained models for detecting faces, landmarks, and expressions."
            },
            {
              "title": "Why face-api.js?",
              "content": "It's easy to use, has pre-trained models, and is well-documented."
            },
            {
              "title": "What can it do?",
              "content": "Detect faces, landmarks, and expressions."
            },
            {
              "title": "Wait, what about TensorFlow.js?",
              "content": "Well, face-api.js is built on top of TensorFlow.js, so you can use the same models and APIs."
            }
          ]
        },
      ]
    },

    "faceApiDeepDive": {
      "id": "faceApiDeepDive",
      "title": "Available APIs",
      "horizandalSubSlides": [
        {
          "list": 
          [
            {
              "content": "`detections`",
             "images": [
              './images/face-detection-input.png',
              './images/face-detection-output.png'
             ]
            }
          ]
        },
        {
          "list": 
          [
            {
              "content": "`landmarks`",
             "images": [
              './images/face-landmarks-input.png',
              './images/face-landmarks-output.png'
             ]
            }
          ]
        },
        {
          "list": 
          [
            {
              "content": "`expressions`",
             "images": [
              './images/face-expressions-input.png',
              './images/face-expressions-output.png'
             ]
            }
          ]
        },
        {
          "list": 
          [
            {
              "content": "`ageAndGender`",
             "images": [
              './images/face-gender-input.png',
              './images/face-gender-output.png'
             ]
            }
          ]
        },
        {
          "list": 
          [
            {
              "content": "`faceMatcher`",
             "images": [
              './images/face-matcher-input.png',
              './images/face-matcher-output.png'
             ]
            }
          ]
        },

        // {
        //   "title": "What do we need?",
        //   "list": 
        //   [
        //     {
        //       "title": "React JS(Vite/CRA)",
        //       "content": "We'll use Vite for this project"
        //     },
        //     {
        //       "title": "face-api.js",
        //       "content": "A JavaScript library built on top of TensorFlow.js for face detection and recognition, providing pre-trained models for detecting faces, landmarks, and expressions."
        //     },
        //     {
        //       "title": "An awesome developer",
        //       "content": "Thats you!"
        //     }
        //   ]
        // },
      
      
      ]
    },

    "minimumCode": {
      "id": "minimumCode",
      "title": "Code Snippet and Flow",
      "horizandalSubSlides": [
        {
          "list": 
          [
            {
              "content": "`setting up face-api.js`",
             "images": [
              './images/setup-face.png',
             ]
            }
          ]
        },
        {
          "list": 
          [
            {
              "content": "`setting up video streaming`",
             "images": [
              './images/setup-video.png',
             ]
            }
          ]
        },
      ]
    },
    "considerations": {
      "id": "considerations",
      "title": "Considerations",
      "horizandalSubSlides": 
        [
          {
            "title": "User Consent",
            "content": "Obtain explicit user permission before accessing webcams or processing facial data, ensuring transparency about its purpose."
          },
          {
            "title": "On-Device Processing",
            "content": "Process data locally in the browser to enhance privacy and prevent unnecessary transmission of sensitive information."
          },
          {
            "title": "Minimized Data Collection",
            "content": "Collect only essential data for the application's functionality and avoid storing biometric data unless necessary."
          },
          {
            "title": "Fairness and Bias",
            "content": "Ensure the face detection models are unbiased and perform consistently across diverse demographics to prevent discrimination."
          }
        ]
      
    },
    "thank": {
      "title": "Thanks & QA ?",
      "social": [
        {
          icon: "FaLinkedin",
          content: "/in/jjayy",
          url: "https://www.linkedin.com/in/jjayy",
        },
        {
          icon: "FaGithub",
          content: "/jaga3421",
          url: "https://www.github.com/jaga3421",
        },
        {
          icon: "FaLink",
          content: "ja.gadee.sh",
          url: "https://ja.gadee.sh",
        },
        {
          icon: "IoMailSharp",
          content: "j@gadee.sh",
          url: "mailto:j@gadee.sh",
        },
      ],
    },
}