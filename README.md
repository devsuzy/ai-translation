# AI-Translation

## POST 
- https://imchat-api.ifdev.cc/chat/gpt

<br />

## Request body
{
    "type": "trans", //필수
    "text": "플로팅 테마 스페이스가 새로운 차원의 공간감을 선사합니다.", //원문넣기
    "count": "", //그대로 유지 두기
    "situation": "Act as a professinoal translator working in commerce company.\nTranslate the following text to ${TARGET LANGUAGE}.\nAll Translated sentences must be translated with as much detail as possible\nPrint ONLY Translated text." // 요청할때마다 보내주시고, TARGET LANGUAGE에 번역될 언어 추가 ("English", "Korean", "Japanese")
}
