"use client";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Home() {
	const { messages, input, isLoading, stop, handleInputChange, handleSubmit } =
		useChat({
			body: {
				temperature: 0.9,
			},
		});
	const [error, setError] = useState<string>("");

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) {
			setError("メッセージを入力してください");
			return;
		}
		setError("");
		handleSubmit(e);
	};

	return (
		<main className="flex w-full min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
			<div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
				{messages.map((m) => (
					<div key={m.id} className="mb-4 p-4 border-b border-gray-300">
						<span className="font-semibold text-gray-800">
							{m.role === "user" ? "Human: " : "AI: "}
						</span>
						<span className="text-gray-600">
							{m.role === "user" ? m.content : ""}
						</span>
					</div>
				))}

				{isLoading && (
					<div className="flex items-center justify-center space-x-2">
						<div className="w-6 h-6 rounded-full border-4 border-t-4 border-blue-600 animate-spin" />
						<span className="text-gray-600">Loading...</span>
					</div>
				)}
				{!isLoading && messages.length !== 0 && (
					<div className="w-full max-w-6xl mt-8">
						<Sandpack
							options={{
								showNavigator: true,
								externalResources: [
									"https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
								],
								editorHeight: "80vh",
								showTabs: false,
							}}
							files={{
								"App.tsx":
									messages[messages.length - 1] &&
									messages[messages.length - 1].role !== "user"
										? messages[messages.length - 1].content
										: "",
								"/public/index.html": `<!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                       <script src="https://cdnjs.cloudflare.com/ajax/libs/3Dmol/2.0.1/3Dmol.js"></script>
                      </head>
                      <body>
                        <div id="root"></div>
                      </body>
                    </html>`,
							}}
							template="react-ts"
							customSetup={{
								dependencies: {
									"lucide-react": "latest",
									recharts: "2.9.0",
									"3dmol": "latest",
								},
							}}
						/>
					</div>
				)}
				<form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
					<textarea
						name="box"
						className="w-full rounded border border-gray-300 text-gray-700 p-3"
						value={input}
						onChange={handleInputChange}
						rows={4}
					/>
					{error && <p className="text-red-500">{error}</p>}
					<button
						type="submit"
						className={`w-full flex items-center justify-center rounded bg-blue-600 text-white p-3 ${
							isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
						}`}
						disabled={isLoading}
					>
						{isLoading ? <span className="loader" /> : <>Send message</>}
					</button>
				</form>
			</div>
		</main>
	);
}
