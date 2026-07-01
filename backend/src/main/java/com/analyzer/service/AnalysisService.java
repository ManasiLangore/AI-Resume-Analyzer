package com.analyzer.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class AnalysisService {
    
    private static final List<String> TECHNICAL_KEYWORDS = Arrays.asList(
        "java", "spring boot", "react", "javascript", "python", "c++", "html", "css", 
        "mysql", "sql", "git", "github", "selenium", "automation testing", "xpath", 
        "rest api", "hibernate", "maven", "aws", "docker", "data structures", "algorithms"
    );

    public AnalysisResult analyzeResumeMatch(String resumeText, String jobDescription){

        //cleaing (converting all to lowercase)
        String cleanResume = resumeText.toLowerCase().replaceAll("\\s+", " ");
        String cleanJobDesc = jobDescription.toLowerCase().replaceAll("\\s+"," ");

        List<String> matchedKeywords = new ArrayList<>();
        List<String> missingKeywords = new ArrayList<>();
        List<String> requiredSkillsInJob = new ArrayList<>();

        //scanning skills
        for(String keyword : TECHNICAL_KEYWORDS){

            //if skills present add it required skills
            if(cleanJobDesc.contains(keyword)){
                requiredSkillsInJob.add(keyword);

                //matching skills
                if(cleanResume.contains(keyword)){
                    //match found add it to matched arrayList
                    matchedKeywords.add(capitalizeWord(keyword));
                }
                else{
                    //match not found add it to missingkeywords arrayList
                    missingKeywords.add(capitalizeWord(keyword));
                }
            }
        }

        //calculation: Compute the mathematical ATS Match Percentage
        int matchPercentage = 0;
        if(!requiredSkillsInJob.isEmpty()){
            //formuls for ATS score
            matchPercentage = (int) Math.round(((double) matchedKeywords.size() / requiredSkillsInJob.size() )* 100);
        }
        else{
            matchPercentage = 0;
        }

        //packaging (Bundle up all data properties inside a clean Result Object wrapper)
        return new AnalysisResult(matchPercentage, matchedKeywords, missingKeywords);
    }

    private String capitalizeWord(String str){
        if(str == null || str.isEmpty()) return str;
        return str.substring(0,1).toUpperCase() + str.substring(1 );
    }
}
