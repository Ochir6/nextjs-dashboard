// components/OCR.js
"use client"
// import React, { useState, useRef, useEffect } from 'react';
// import Tesseract from 'tesseract.js';

// const OCRWithCanvas = () => {
//   const [text, setText] = useState('');
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [bbox, setBbox] = useState({ x: 0, y: 0, width: 0, height: 0 });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const rect = canvasRef.current.getBoundingClientRect();
//     setStartX(e.clientX - rect.left);
//     setStartY(e.clientY - rect.top);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const width = x - startX;
//     const height = y - startY;
//     setBbox({ x: startX, y: startY, width, height });

//     const ctx = canvasRef.current.getContext('2d');
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       ctx.strokeStyle = 'red';
//       ctx.lineWidth = 2;
//       ctx.strokeRect(startX, startY, width, height);
//     };
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const handleOCRWithBbox = async () => {
//     if (!image) return;

//     setIsLoading(true);

//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       canvas.width = bbox.width;
//       canvas.height = bbox.height;
//       ctx.drawImage(
//         img,
//         bbox.x, bbox.y, bbox.width, bbox.height,
//         0, 0, bbox.width, bbox.height
//       );
//       const croppedImageDataUrl = canvas.toDataURL();

//       Tesseract.recognize(
//         croppedImageDataUrl,
//         'eng',
//         {
//           logger: (m) => console.log(m),
//         }
//       )
//       .then(({ data: { text } }) => {
//         setText(text);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsLoading(false);
//       });
//     };
//   };

//   useEffect(() => {
//     if (image) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const img = new Image();
//       img.src = image;
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//       };
//     }   
//   }, [image]);

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <canvas
//         ref={canvasRef}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{ border: '1px solid black' }}
//       />
//       <button onClick={handleOCRWithBbox}>Start OCR with Bbox</button>
//       {isLoading ? <p>Loading...</p> : <p>{text}</p>}
//     </div>
//   );
// };

// export default OCRWithCanvas;


// import React, { useState, useRef, useEffect } from 'react';
// import Tesseract from 'tesseract.js';

// const OCRWithCanvas = () => {
//   const [texts, setTexts] = useState([]);
//   const [image, setImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [currentBbox, setCurrentBbox] = useState(null);
//   const [bboxes, setBboxes] = useState([]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMouseDown = (e) => {
//     setIsDrawing(true);
//     const rect = canvasRef.current.getBoundingClientRect();
//     setStartX(e.clientX - rect.left);
//     setStartY(e.clientY - rect.top);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const width = x - startX;
//     const height = y - startY;

//     const ctx = canvasRef.current.getContext('2d');
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       bboxes.forEach((bbox) => {
//         ctx.strokeStyle = 'red';
//         ctx.lineWidth = 2;
//         ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
//       });
//       ctx.strokeStyle = 'blue';
//       ctx.strokeRect(startX, startY, width, height);
//     };
//     setCurrentBbox({ x: startX, y: startY, width, height });
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   const handleOCRWithCurrentBbox = async () => {
//     if (!image || !currentBbox) return;

//     setIsLoading(true);

//     const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = currentBbox.width;
//       canvas.height = currentBbox.height;
//       ctx.drawImage(
//         img,
//         currentBbox.x, currentBbox.y, currentBbox.width, currentBbox.height,
//         0, 0, currentBbox.width, currentBbox.height
//       );
//       Tesseract.recognize(
//         canvas.toDataURL(),
//         'eng',
//         {
//           logger: (m) => console.log(m),
//         }
//       )
//       .then(({ data: { text } }) => {
//         setTexts([...texts, text]);
//         setBboxes([...bboxes, currentBbox]);
//         setCurrentBbox(null);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsLoading(false);
//       });
//     };
//   };

//   const handleReset = () => {
//     setBboxes([]);
//     setTexts([]);
//     const ctx = canvasRef.current.getContext('2d');
//     const img = new Image();
//     img.src = image;
//     img.onload = () => {
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       ctx.drawImage(img, 0, 0);
//     };
//   };

//   useEffect(() => {
//     if (image) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const img = new Image();
//       img.src = image;
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//       };
//     }
//   }, [image]);

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <canvas
//         ref={canvasRef}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{ border: '1px solid black' }}
//       />
//       <button onClick={handleOCRWithCurrentBbox} disabled={!currentBbox || isLoading}>Detect Text in Current Field</button>
//       <button onClick={handleReset}>Reset</button>
//       {isLoading ? <p>Loading...</p> : <div>{texts.map((text, index) => <p key={index}>{text}</p>)}</div>}
//     </div>
//   );
// };

// export default OCRWithCanvas;


import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

const OCRWithCanvas = () => {
  const [texts, setTexts] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentBbox, setCurrentBbox] = useState(null);
  const [bboxes, setBboxes] = useState([]);

  const canvasRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = x - startX;
    const height = y - startY;

    const ctx = canvasRef.current.getContext('2d');
    // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      bboxes.forEach((bbox) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
      });
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, width, height);
    };

    setCurrentBbox({ x: startX, y: startY, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentBbox) {
      setBboxes([...bboxes, currentBbox]);
      setCurrentBbox(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOCRWithCurrentBbox = async () => {
    if (!image || bboxes.length === 0) return;

    setIsLoading(true);

    const img = new Image();
    img.src = image;
    img.onload = () => {
      Promise.all(
        bboxes.map(async (bbox) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = bbox.width;
          canvas.height = bbox.height;
          ctx.drawImage(
            img,
            bbox.x, bbox.y, bbox.width, bbox.height,
            0, 0, bbox.width, bbox.height
          );
          const { data: { text } } = await Tesseract.recognize(canvas.toDataURL(), 'eng');
          return text;
        })
      )
      .then((textsArray) => {
        setTexts(textsArray);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    };
  };

  const handleReset = () => {
    setBboxes([]);
    setTexts([]);
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [image]);

  return (
    <div>
      <h2>Upload Image and Draw Fields for OCR</h2>
      <input type="file" onChange={handleImageChange} />
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={handleOCRWithCurrentBbox} disabled={isLoading || bboxes.length === 0}>Detect Text in Fields</button>
      <button onClick={handleReset}>Reset</button>
      {isLoading ? <p>Loading...</p> : <div>{texts.map((text, index) => <p key={index}>{text}</p>)}</div>}
    </div>
  );
};

export default OCRWithCanvas;
