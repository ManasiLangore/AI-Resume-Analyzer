package com.analyzer.service;

import java.util.List;

public class AiAnalysisResponse {
    private int atsScore;
    private String structuralCritique;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> optimizationSuggestions;

    // Default Constructor (Required for JSON deserialization)
    public AiAnalysisResponse() {}

    public AiAnalysisResponse(int atsScore, String structuralCritique, List<String> matchedSkills, List<String> missingSkills, List<String> optimizationSuggestions) {
        this.atsScore = atsScore;
        this.structuralCritique = structuralCritique;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.optimizationSuggestions = optimizationSuggestions;
    }

    // Getters and Setters
    public int getAtsScore() { return atsScore; }
    public void setAtsScore(int atsScore) { this.atsScore = atsScore; }

    public String getStructuralCritique() { return structuralCritique; }
    public void setStructuralCritique(String structuralCritique) { this.structuralCritique = structuralCritique; }

    public List<String> getMatchedSkills() { return matchedSkills; }
    public void setMatchedSkills(List<String> matchedSkills) { this.matchedSkills = matchedSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public List<String> getOptimizationSuggestions() { return optimizationSuggestions; }
    public void setOptimizationSuggestions(List<String> optimizationSuggestions) { this.optimizationSuggestions = optimizationSuggestions; }
}