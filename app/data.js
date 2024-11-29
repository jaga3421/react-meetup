export default {
  "intro": {
    "title": "Face Detection in React with TensorFlow.js",
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
        "Setting up the project",
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
      "title": "Building with React and TensorFlow.js",
      "horizandalSubSlides": []
    },


    "libraries": {
      "id": "libraries",
      "title": "Useful Libraries",
      "horizandalSubSlides": [
        {
          "title": "Face-api.js",
          "content": "A JavaScript library built on top of TensorFlow.js for face detection and recognition, providing pre-trained models for detecting faces, landmarks, and expressions.",
          "image": "https://example.com/image4.jpg",
          "link": "https://github.com/justadudewhohacks/face-api.js"
        },
        {
          "title": "ml5.js",
          "content": "A high-level library that simplifies the use of machine learning in the browser, including models for face detection.",
          "image": "https://example.com/image5.jpg",
          "link": "https://ml5js.org/"
        },
        {
          "title": "OpenCV.js",
          "content": "A JavaScript binding for OpenCV, allowing for various image processing tasks, including face detection.",
          "image": "https://example.com/image6.jpg",
          "link": "https://docs.opencv.org/3.4/d5/d10/tutorial_js_root.html"
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