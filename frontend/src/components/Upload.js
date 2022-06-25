import { useState, useEffect } from "react";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Input, Typography } from "@mui/material";
import Dropzone from "react-dropzone";

import * as tf from "@tensorflow/tfjs";

export default function Upload() {
	const [model, setModel] = useState();

	const loadmodel = async () => {
		const url = {
			model: "https://volvere-demo.s3.ap-south-1.amazonaws.com/JSmodel/model.json",
			model2: "https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json",
		};

		const model = await tf.loadLayersModel(url.model);
		setModel(model);
		console.log("Model loaded");
		// console.log(model.summary());
	};

	const classes = [
		"Apple___Apple_scab",
		"Apple___Black_rot",
		"Apple___Cedar_apple_rust",
		"Apple___healthy",
		"Blueberry___healthy",
		"Cherry_(including_sour)___Powdery_mildew",
		"Cherry_(including_sour)___healthy",
		"Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
		"Corn_(maize)___Common_rust_",
		"Corn_(maize)___Northern_Leaf_Blight",
		"Corn_(maize)___healthy",
		"Grape___Black_rot",
		"Grape___Esca_(Black_Measles)",
		"Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
		"Grape___healthy",
		"Orange___Haunglongbing_(Citrus_greening)",
		"Peach___Bacterial_spot",
		"Peach___healthy",
		"Pepper,_bell___Bacterial_spot",
		"Pepper,_bell___healthy",
		"Potato___Early_blight",
		"Potato___Late_blight",
		"Potato___healthy",
		"Raspberry___healthy",
		"Soybean___healthy",
		"Squash___Powdery_mildew",
		"Strawberry___Leaf_scorch",
		"Strawberry___healthy",
		"Tomato___Bacterial_spot",
		"Tomato___Early_blight",
		"Tomato___Late_blight",
		"Tomato___Leaf_Mold",
		"Tomato___Septoria_leaf_spot",
		"Tomato___Spider_mites Two-spotted_spider_mite",
		"Tomato___Target_Spot",
		"Tomato___Tomato_Yellow_Leaf_Curl_Virus",
		"Tomato___Tomato_mosaic_virus",
		"Tomato___healthy",
	];

	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [data, setData] = useState();
	const [image, setImage] = useState(false);
	const [isLoading, setIsloading] = useState(false);

	const clearData = () => {
		setData(null);
		setImage(false);
		setSelectedFile(null);
		setPreview(null);
	};

	useEffect(() => {
		if (!preview) {
			return;
		}
		setIsloading(true);
		detect();
	}, [preview]);

	const onSelectFile = async (files) => {
		await loadmodel();
		if (!files || files.length === 0) {
			setSelectedFile(undefined);
			setImage(false);
			setData(undefined);
			return;
		}
		setIsloading(true);
		setSelectedFile(files[0]);
		const objectUrl = URL.createObjectURL(files[0]);
		setPreview(objectUrl);
		setData(undefined);
		setImage(true);
		// detect();
	};

	const detect = () => {
		try {
			const image = tf.browser.fromPixels(document.getElementById("img"));
			const resized = tf.image.resizeBilinear(image, [224, 224]);
			const tensor = resized.expandDims(0);
			const prediction = model.predict(tensor);
			const predictionArray = prediction.dataSync();
			const predictionIndex = predictionArray.indexOf(Math.max(...predictionArray));
			const predictionClass = classes[predictionIndex];
			const confidence = predictionArray[predictionIndex];
			setData({
				predictionIndex: predictionIndex,
				predictionClass: predictionClass,
				confidence: confidence,
			});
			console.log({ predictionIndex, predictionClass, confidence });
			setIsloading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container maxWidth={"lg"}>
			<Card
				sx={{
					margin: "auto",
					height: "auto",
					maxWidth: "500px",
					backgroundColor: "primary.main",
					borderRadius: "15px",
					color: "accent",
				}}
			>
				{image && (
					<>
						<CardMedia id="img" component="img" height="400" image={preview} />
						{isLoading && (
							<CardContent>
								<Typography variant="h6">Loading...</Typography>
							</CardContent>
						)}
						{!isLoading && (
							<CardContent>
								<Typography variant="h6">prediction index : {data.predictionIndex}</Typography>
								<Typography variant="h6">prediction class : {data.predictionClass}</Typography>
								<Typography variant="h6">prediction confidence : {data.confidence}</Typography>
							</CardContent>
						)}
						<CardActionArea>
							<Button onClick={() => clearData()} fullWidth color="accent">
								Test Another Image
							</Button>
						</CardActionArea>
					</>
				)}
				{!image && (
					<CardContent>
						<Dropzone multiple={false} onDrop={(acceptedFiles) => onSelectFile(acceptedFiles)}>
							{({ getRootProps, getInputProps }) => (
								<Box sx={{ border: "dotted", borderRadius: "15px", p: 4, pointerEvents: "fill" }}>
									<div {...getRootProps()}>
										<Input {...getInputProps()} />
										<Typography variant="h5">Drag and drop some files here, or click to select files</Typography>
									</div>
								</Box>
							)}
						</Dropzone>
					</CardContent>
				)}
			</Card>
		</Container>
	);
}
