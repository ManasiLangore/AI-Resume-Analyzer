package com.analyzer.service;

import java.util.List;

public class AnalysisResult {
    
    private int matchPercentage;
    private List<String> matchedKeywords;
    private List<String> missingKeywords;

    //constructor
    public AnalysisResult(int matchPercentage, List<String> matchedKeywords, List<String> missingKeywords){
        this.matchPercentage = matchPercentage;
        this.matchedKeywords = matchedKeywords;
        this.missingKeywords = missingKeywords;
    }

     //getter
    public int getMatchPercentage() {
        return matchPercentage;
    }

    public List<String> getMatchedKeywords() {
        return matchedKeywords;
    }

    public List<String> getMissingKeywords() {
        return missingKeywords;
    }

   
    
}
