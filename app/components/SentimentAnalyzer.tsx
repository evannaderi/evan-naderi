// src/components/SentimentAnalyzer.tsx

import React, { useState } from 'react';
import './styles/SentimentAnalyzer.css';

const SentimentAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState({ roberta: '', bert: '', distilbert: '' });
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async () => {
    setIsLoading(true);
    // Example API call structure, replace with actual API requests
    const responses = await Promise.all([
      fetch(`API_ENDPOINT/roberta?text=${inputText}`).then((res) => res.json()),
      fetch(`API_ENDPOINT/bert?text=${inputText}`).then((res) => res.json()),
      fetch(`API_ENDPOINT/distilbert?text=${inputText}`).then((res) => res.json()),
    ]);
    setResults({ roberta: responses[0].sentiment, bert: responses[1].sentiment, distilbert: responses[2].sentiment });
    setIsLoading(false);
  };

  return (
    <div className="sentiment-analyzer">
      <h2>Sentiment Analyzer</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to analyze"
        rows={4}
      />
      <button onClick={analyzeSentiment} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>
      <div className="results">
        <h3>Results:</h3>
        <p>RoBERTa: {results.roberta}</p>
        <p>BERT: {results.bert}</p>
        <p>DistilBERT: {results.distilbert}</p>
      </div>
    </div>
  );
};

export default SentimentAnalyzer;
