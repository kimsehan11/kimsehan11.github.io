export type ProjectSectionBlock = {
  title: string;
  items: string[];
};

export type ProjectSectionImage = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  group?: "conversation" | "showcase";
  href?: string;
  width?: number;
  height?: number;
};

export type ProjectSectionTable = {
  title: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type ProjectCodeFlowStep = {
  eyebrow: string;
  file: string;
  title: string;
  detail: string;
};

export type ProjectCodeFlow = {
  label: string;
  entry: ProjectCodeFlowStep[];
  branches: ProjectCodeFlowStep[];
  output: ProjectCodeFlowStep;
};

export type ProjectSection = {
  title: string;
  layout?: "standard" | "results" | "flow" | "reference";
  paragraphs?: string[];
  bullets?: string[];
  blocks?: ProjectSectionBlock[];
  images?: ProjectSectionImage[];
  tables?: ProjectSectionTable[];
  flow?: ProjectCodeFlow;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  type: string;
  period: string;
  summary: string;
  description: string;
  contributions: string[];
  stack: string[];
  github: string;
  paper?: { label: string; href: string };
  demo?: { label: string; href: string };
  presentation?: { label: string; href: string };
  sections?: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "hairstyle-is-all-you-need",
    index: "01",
    title: "Hairstyle is All You Need",
    type: "MULTIMODAL AI SERVICE",
    period: "2025",
    summary: "대화형 헤어스타일 추천과 가상 체험을 결합한 멀티모달 AI 서비스",
    description: "얼굴형·피부 톤·퍼스널 컬러와 자연어 취향을 함께 이해해 개인화된 헤어스타일을 추천하고, 가상 체험까지 연결한 서비스입니다.",
    contributions: [
      "Advanced RAG와 멀티 툴 에이전트를 활용한 대화형 추천 파이프라인 구현",
      "이미지 분석 결과와 사용자 자연어 요구를 결합한 멀티모달 추천 설계",
      "Context Precision 0.94, MRR 0.97, NDCG 0.94 기반 검색 성능 검증",
    ],
    stack: ["Python", "JavaScript", "Django", "FastAPI", "LangChain", "Transformers", "HTML5", "CSS3", "FAISS", "MySQL", "Ubuntu", "Docker", "Docker Compose", "RunPod", "AWS", "Git"],
    github: "https://github.com/kimsehan11/hairstyle-is-all-you-need",
    demo: {
      label: "DEMO VIDEO",
      href: "https://youtu.be/_GqkF_I5t7A",
    },
    sections: [
      {
        title: "1-1. 프로젝트 개요",
        blocks: [
          {
            title: "뷰티 산업의 변화",
            items: [
              "개인 맞춤형 서비스에 대한 높은 수요 — README 인용 자료는 개인화 서비스 기대 71%, 기대 미충족 시 부정적 인식 76%를 제시",
              "퍼스널 컬러·헤어 컨설팅 등 개인별 특성을 고려한 맞춤형 뷰티 상담 서비스의 인기",
            ],
          },
          {
            title: "기존 오프라인 서비스의 한계",
            items: [
              "컨설팅당 수만원~수십만원의 높은 비용과 1시간 이상의 긴 소요 시간",
              "오프라인 방문에 따른 시간과 장소의 제약",
              "VTO(Virtual Try-On) 기술의 부상 — 온라인 가상 체험이 의류·메이크업에서 헤어스타일까지 확대",
            ],
          },
          {
            title: "현재 헤어스타일 온라인 서비스의 문제점",
            items: [
              "버튼식의 단순 선택 UI와 제한된 옵션으로 사용자의 구체적인 취향 파악이 어려움",
              "면대면 퍼스널 컨설팅을 대체할 개인 맞춤형 대화 인터페이스의 부재",
              "고퀄리티 헤어스타일 가상 체험을 제공하는 서비스의 부족",
            ],
          },
          {
            title: "프로젝트의 필요성",
            items: [
              "비정형 사용자 질의 처리 — “가벼우면서도 러블리하고 너무 짧지는 않고, 가을 느낌이 물씬 나는 헤어스타일이 뭐가 있을까?”",
              "대화 속 다양하고 복잡한 표현에서 핵심 취향과 조건을 추출할 필요",
              "텍스트 질의와 얼굴 이미지를 함께 분석해 종합적인 맞춤 상담과 가상 체험 제공",
            ],
          },
          {
            title: "솔루션: 이미지·언어 멀티모달 AI 챗봇",
            items: [
              "LLM 기반 지능형 컨설팅과 VTO를 결합한 멀티모달 챗봇 개발",
              "미용실에서 스타일링 가능한 다양한 헤어스타일·컬러를 이해하고 자연스러운 대화로 취향 파악",
              "얼굴 이미지 분석을 지원하는 정밀 추천과 고퀄리티 VTO를 하나의 서비스로 연결",
            ],
          },
          {
            title: "프로젝트 목표 — 대화형 AI 상담",
            items: [
              "자연어 기반 취향 분석: 사용자의 비정형적이고 복잡한 요구사항 이해",
              "맞춤형 스타일 제안: 개인의 취향과 기호를 반영한 구체적인 헤어스타일 추천",
              "직관적인 인터페이스: 복잡한 메뉴 없이 채팅만으로 상담 진행",
            ],
          },
          {
            title: "프로젝트 목표 — 생성형 AI 가상 체험",
            items: [
              "자연어로 표현된 복잡한 합성 요청을 이해하고 요청한 헤어스타일을 사용자 얼굴에 적용",
              "고퀄리티 이미지 생성과 3차원 생성 기술을 통합해 입체적인 스타일 체험 제공",
            ],
          },
          {
            title: "프로젝트 목표 — 최신 트렌드 정보",
            items: [
              "웹 서치 도구를 연동해 최신 헤어스타일 트렌드 검색",
              "계절별·연령별 정보와 현재 유행하는 스타일을 반영한 상담",
              "변화하는 뷰티 트렌드에 대응할 수 있도록 지속적인 정보 업데이트 지향",
            ],
          },
        ],
        images: [
          {
            src: "/projects/hairstyle/readme/Mckinsey.png",
            alt: "README에서 인용한 개인화 서비스 기대와 소비자 반응 자료",
            caption: "개인 맞춤형 서비스 수요",
            className: "overview-wide",
            width: 607,
            height: 412,
          },
          {
            src: "/projects/hairstyle/readme/popularity.png",
            alt: "맞춤형 뷰티 컨설팅 서비스 사례를 소개한 README 기사 자료",
            caption: "퍼스널 컬러·헤어 컨설팅 서비스",
            className: "overview-wide",
            width: 623,
            height: 438,
          },
          {
            src: "/projects/hairstyle/vto-market-overview.png",
            alt: "가상 메이크업 시장 성장 전망과 기존 AI 가상 체험 서비스 사례를 합친 자료",
            className: "overview-wide overview-vto",
          },
          {
            src: "/projects/hairstyle/positioning-map.png",
            alt: "개인화 수준과 접근성을 기준으로 비교한 서비스 포지셔닝 맵",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "1-2. 결과",
        layout: "results",
        blocks: [
          {
            title: "주요 내용 및 성과",
            items: [
              "대화형 상담 UX 구현",
              "개인 맞춤형 서비스 제공",
              "2D부터 3D까지 가능한 가상 체험 서비스 제공",
              "최신 K-뷰티 트렌드 반영",
            ],
          },
          {
            title: "향후 계획 및 개선 방향",
            items: [
              "최신 Face Swap 모델 탐색 및 테스트",
              "오픈소스 이미지 생성 모델 탐색 및 적용",
              "최신 스타일 자동 업데이트 기능 추가",
              "기존 추천 알고리즘의 얼굴형 정보에 이목구비와 모발 등 세부 요소 추가 반영",
            ],
          },
        ],
        images: [
          {
            src: "/projects/hairstyle/chat-user-photo-cropped-v2.png",
            alt: "헤어스타일 상담에 사용된 사용자 사진",
            caption: "헤어스타일 생성 요청 예시",
            className: "result-user-photo",
            group: "conversation",
          },
          {
            src: "/projects/hairstyle/chat-request-upscaled.png",
            alt: "애즈펌과 레드브라운 스타일을 요청하는 사용자 메시지",
            className: "result-request",
            group: "conversation",
          },
          {
            src: "/projects/hairstyle/personalized-recommendation.png",
            alt: "사용자 요청을 반영한 헤어스타일 결과와 추천 이유를 설명하는 전체 대화",
            caption: "추천 결과 및 대화 내용",
            className: "result-recommendation-full",
            group: "conversation",
          },
          {
            src: "/projects/hairstyle/style-gallery.png",
            alt: "다양한 헤어스타일 가상 체험 결과 갤러리",
            caption: "갤러리",
            className: "result-gallery",
            group: "showcase",
          },
          {
            src: "/projects/hairstyle/virtual-try-on-female.png",
            alt: "여성 이미지에 적용된 헤어스타일 가상 체험 결과",
            caption: "3D 뷰 예시",
            className: "result-vto-female",
            group: "showcase",
          },
          {
            src: "/projects/hairstyle/virtual-try-on-male.png",
            alt: "남성 이미지에 적용된 헤어스타일 가상 체험 결과",
            className: "result-vto-male",
            group: "showcase",
          },
        ],
      },
      {
        title: "1-3. 시스템 아키텍처",
        blocks: [
          {
            title: "서비스 구성",
            items: [
              "EC2 기반 웹 배포와 FastAPI 기반 사용자 요청 라우팅",
              "RDS와 S3를 활용한 사용자 정보 및 이미지 데이터 관리",
              "대화형 에이전트가 헤어스타일 추천·이미지 생성·웹 검색 도구를 상황에 맞게 호출",
              "헤어 도감과 갤러리를 포함한 사용자 친화적 웹 UX 구현",
            ],
          },
        ],
        images: [
          {
            src: "/projects/hairstyle/readme/system_architecture.png",
            alt: "헤어스타일 추천 및 가상 체험 서비스 시스템 아키텍처",
            caption: "SYSTEM ARCHITECTURE",
            className: "overview-wide",
          },
        ],
        tables: [
          {
            title: "기술 스택",
            columns: ["카테고리", "기술"],
            rows: [
              ["언어", "Python · JavaScript"],
              ["프레임워크 / 라이브러리", "LangChain · Transformers · Django · FastAPI"],
              ["프론트엔드", "HTML5 · CSS3"],
              ["데이터베이스", "MySQL"],
              ["벡터 데이터베이스", "FAISS"],
              ["배포 / 인프라", "Ubuntu · Docker · Docker Compose · RunPod · AWS"],
              ["협업", "Git"],
            ],
            note: "README 기술 스택과 시스템 구축 설명 기준. AWS 구성에는 EC2·RDS·S3가 포함됩니다.",
          },
        ],
      },
      {
        title: "1-4. 핵심 설계",
        blocks: [
          {
            title: "RAG",
            items: [
              "헤어스타일·뷰티 블로그 콘텐츠를 수집·전처리해 FAISS 벡터스토어 구축",
              "임베딩 모델과 리랭커를 평가해 검색 조합을 선정하고 Advanced RAG 적용",
            ],
          },
          {
            title: "에이전트 구축",
            items: [
              "추천·이미지 생성·웹 검색 등 여러 기능을 효율적으로 관리하는 에이전트 구조 설계",
              "성능 평가를 통한 멀티모달 에이전트 모델 선정",
              "다양한 상담 상황에 대응할 수 있는 프롬프트 설계 및 최적화",
              "헤어스타일 추천, 이미지 생성, 웹 검색 도구별 알고리즘 설계 및 개발",
            ],
          },
          {
            title: "헤어스타일 추천 알고리즘",
            items: [
              "화이트밸런스로 원본 이미지의 조명 영향을 완화",
              "이미지 분석으로 성별·얼굴형·피부색을 추출하고 퍼스널 컬러 분류 알고리즘 적용",
              "벡터 유사도 기반 자체 추천 시스템을 설계하고 추천 점수 계산",
              "사용자 요구사항과 얼굴 분석 정보의 균형을 위한 가중치 기반 추천",
              "Advanced RAG로 추천 스타일과 관련된 근거 문서를 검색해 답변 생성",
            ],
          },
          {
            title: "이미지 합성 알고리즘",
            items: [
              "자연어 질의에서 헤어스타일·컬러·기장 등 합성 키워드 추출",
              "얼굴 영역 자동 크롭과 초해상화로 입력 이미지 품질 개선",
              "Face Swap으로 원본 얼굴 유사도를 보존하고 이미지 편집 모델로 스타일 적용",
              "Gaussian Splatting 기반 3D 생성·렌더링을 연결해 입체 체험으로 확장",
            ],
          },
          {
            title: "상세 설계",
            items: [
              "상세 데이터 구축: 성별·얼굴형·기장·퍼스널 컬러·계절·헤어스타일·헤어 컬러별로 세분화된 데이터 구성",
              "QA 캐시 시스템: 이전 추천 결과를 벡터스토어에 저장하고 유사 질의에서 활용해 빠른 응답 제공",
              "기장 인지 알고리즘: 기장 요청에 맞는 추천·합성을 위한 알고리즘과 프롬프트 설계",
              "가중치 기반 추천: 사용자 요구사항과 얼굴 분석 정보의 균형을 맞추는 score 기반 가중치 설계",
              "응답 히스토리: 세션별 대화 컨텍스트를 유지해 이전 대화와 연결되는 상담 지원",
            ],
          },
        ],
        images: [
          {
            src: "/projects/hairstyle/readme/recommendation.png",
            alt: "얼굴 분석과 RAG를 결합한 헤어스타일 추천 알고리즘",
            caption: "RECOMMENDATION PIPELINE",
            className: "overview-wide",
          },
          {
            src: "/projects/hairstyle/readme/image_generation.png",
            alt: "키워드 추출부터 초해상화, 얼굴 보존, 3D 렌더링까지의 이미지 합성 알고리즘",
            caption: "IMAGE GENERATION PIPELINE",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "1-5. 모델 선정",
        layout: "reference",
        paragraphs: [
          "다양한 VLM, 임베딩, 리랭커 모델을 평가지표 기반으로 비교해 모델과 조합을 선정했습니다. 아래는 프로젝트 README에 명시된 선정 모델과 검색 설정입니다.",
        ],
        tables: [
          {
            title: "RAG 모델 및 검색 설정",
            columns: ["항목", "선정 값", "역할"],
            rows: [
              ["임베딩 모델", "dragonkue/snowflake-arctic-embed-l-v2.0-ko", "검색용 문서·질의 임베딩"],
              ["리랭커", "Dongjin-kr/ko-reranker", "검색 후보 문서 재정렬"],
              ["Chunk size", "200", "문서 분할 크기"],
              ["Overlap", "100", "청크 사이 중복 범위"],
              ["Top K", "2", "상위 검색 문서 수 설정"],
            ],
          },
          {
            title: "에이전트·얼굴 분석·이미지 합성 모델",
            columns: ["분야", "모델", "역할"],
            rows: [
              ["에이전트", "ChatGPT (gpt-5.2-chat-latest)", "의도 파악 · Tool 호출 · 자연어 생성 · 대화 관리"],
              ["성별·얼굴형 분석", "IdentiFace", "이미지 기반 성별과 얼굴형 추출"],
              ["피부색 분석", "SkinToneClassifier", "이미지 기반 피부색 추출"],
              ["초해상화", "SAFMN", "원본 해상도로부터 고해상도 이미지 생성"],
              ["이미지 편집", "gpt-image-1", "이미지 편집 API를 통한 헤어스타일 적용"],
              ["얼굴 보존", "FaceSwap", "얼굴 재생성 문제를 완화하고 원본 얼굴 유지"],
              ["3D 생성", "Face Lift", "Gaussian Splatting 기반 3차원 생성"],
            ],
            note: "README의 선정 모델 기준. 이미지 편집 모델명은 실제 코드의 gpt-image-1 표기를 사용했습니다.",
          },
        ],
      },
      {
        title: "1-6. 실제 코드 플로우",
        layout: "flow",
        flow: {
          label: "Hairstyle is All You Need 요청 처리 코드 흐름",
          entry: [
            {
              eyebrow: "01 / REQUEST",
              file: "POST /query/stream",
              title: "사용자 요청 수신",
              detail: "텍스트 + 선택적 이미지",
            },
            {
              eyebrow: "02 / SESSION",
              file: "model_serve.py",
              title: "세션별 실행 환경",
              detail: "Event Queue + Worker Thread",
            },
            {
              eyebrow: "03 / ROUTING",
              file: "model/agent_openai.py",
              title: "Agent 도구 선택",
              detail: "프롬프트 + 대화 컨텍스트",
            },
          ],
          branches: [
            {
              eyebrow: "RAG",
              file: "rag/retrieval.py",
              title: "검색·재정렬",
              detail: "FAISS → Reranker",
            },
            {
              eyebrow: "RECOMMEND",
              file: "model/tools.py",
              title: "개인화 추천",
              detail: "얼굴형 · 계절 · 퍼스널 컬러",
            },
            {
              eyebrow: "IMAGE",
              file: "model/tools.py",
              title: "이미지 생성",
              detail: "Edit → Face Swap → SR",
            },
            {
              eyebrow: "3D / WEB",
              file: "Agent tools",
              title: "확장 도구",
              detail: "3D 결과 · 최신 정보 검색",
            },
          ],
          output: {
            eyebrow: "04 / RESPONSE",
            file: "SSE event stream",
            title: "진행 상태와 결과 전달",
            detail: "status → result path → client",
          },
        },
      },
      {
        title: "1-7. 평가 및 최적화",
        layout: "reference",
        paragraphs: [
          "추천과 이미지 생성의 품질을 각각 정량·정성 지표로 평가하고 응답시간을 측정했습니다. 결과 표는 README 보고값이며, P는 자체 정성 평가에서 통과했음을 뜻합니다.",
        ],
        blocks: [
          {
            title: "평가 데이터셋 구축",
            items: [
              "Corpus 추출: VectorStore에서 전체 뷰티 도메인 문서를 추출하고 메타데이터 타입별로 그룹화",
              "Retrieval Ground Truth 설정: Corpus에서 샘플링한 원본 문서를 검색 정답으로 지정",
              "Query 생성: GPT-4o를 활용해 문서별 검색 질의를 자동 생성",
              "Generation Ground Truth 생성: LLM으로 해당 문서에 근거한 정답 답변 생성",
            ],
          },
          {
            title: "평가 지표 선정",
            items: [
              "에이전트 성능 평가를 위한 자체 정성 평가지표 수립",
              "Retrieval: Context Recall · Context Precision · MRR · NDCG",
              "Generation: Faithfulness · Answer Relevancy 선정 및 자체 정성 평가",
              "이미지 생성: CLIP-IQA로 이미지 품질, ArcFace로 원본 얼굴 유사도 평가",
              "문장 구사력·질의 부합성·할루시네이션 자체평가와 응답시간 측정",
            ],
          },
          {
            title: "최적화",
            items: [
              "Retrieval: Chunk size·Overlap·Top K 조합별 성능 비교 및 최적 조합 선정",
              "Embedding: 임베딩 모델별 Retrieval 성능 비교와 리랭커 평가를 통한 검색 조합 선정",
              "에이전트: Generation 평가를 통한 모델 성능 비교 및 최적 모델 선정",
            ],
          },
        ],
        tables: [
          {
            title: "Recommendation Evaluation",
            columns: ["평가 항목", "평가 종류", "평가지표", "평가 결과"],
            rows: [
              ["Retrieval", "정량", "Context Recall", "0.75"],
              ["Retrieval", "정량", "Context Precision", "0.94"],
              ["Retrieval", "정량", "MRR", "0.97"],
              ["Retrieval", "정량", "NDCG", "0.94"],
              ["Generation", "정량", "Faithfulness", "0.91"],
              ["문장 구사력", "정성", "자체평가", "P"],
              ["질의 부합성", "정성", "자체평가", "P"],
              ["할루시네이션", "정성", "자체평가", "P"],
              ["응답시간", "정량", "—", "20초"],
            ],
            note: "Answer Relevancy는 README에서 선정 지표로 언급되지만 결과 점수는 공개되어 있지 않아 수치를 추가하지 않았습니다.",
          },
          {
            title: "Image Generation Evaluation",
            columns: ["평가 항목", "평가 종류", "평가지표", "평가 결과"],
            rows: [
              ["이미지 품질", "정량", "CLIP-IQA", "0.82"],
              ["원본 얼굴 유사도", "정량", "ArcFace", "0.80"],
              ["질의 부합성", "정성", "자체평가", "P"],
              ["할루시네이션", "정성", "자체평가", "P"],
              ["응답시간", "정량", "—", "60초"],
            ],
          },
        ],
      },
      {
        title: "1-8. 서비스 시연",
        layout: "reference",
        paragraphs: [
          "README에 공개된 서비스 결과 예시와 시연 영상입니다. 아래 영상 썸네일 또는 페이지 상단의 DEMO VIDEO 버튼을 누르면 YouTube에서 전체 시연을 볼 수 있습니다.",
        ],
        images: [
          {
            src: "/projects/hairstyle/readme/sample.png",
            alt: "GitHub README에 공개된 Hairstyle is All You Need 서비스 결과 예시",
            caption: "서비스 결과 예시",
            className: "overview-wide",
            width: 4491,
            height: 2120,
          },
          {
            src: "/projects/hairstyle/readme/demo_thumbnail.png",
            alt: "YouTube에서 Hairstyle is All You Need 시연 영상 보기",
            caption: "시연 영상 — YouTube에서 보기 ↗",
            className: "overview-wide",
            href: "https://youtu.be/_GqkF_I5t7A",
            width: 1836,
            height: 980,
          },
        ],
      },
    ],
  },
  {
    slug: "knowledge-conflicts",
    index: "02",
    title: "Knowledge Conflicts in RAG",
    type: "RESEARCH IMPLEMENTATION",
    period: "2025",
    summary: "검색 지식과 모델 내부 지식의 충돌을 다루는 ASTUTE RAG 구현 및 분석",
    description: "LLM의 파라메트릭 지식과 검색 문서가 충돌하는 상황을 분석하고, ASTUTE RAG의 접근을 재현해 답변 신뢰성을 비교했습니다.",
    contributions: [
      "ASTUTE RAG 논문의 핵심 방법론을 코드로 재현하고 실험 파이프라인 구성",
      "PopQA·NQ·TriviaQA·BioASQ 데이터셋을 활용한 지식 충돌 평가",
      "Mistral 기반 로컬 모델과 GPT·Gemini 계열 모델 결과 비교",
    ],
    stack: ["Python", "PyTorch", "Transformers", "LangChain", "FAISS", "Mistral", "4-bit Quantization"],
    github: "https://github.com/kimsehan11/Knowledge-Conflicts",
    paper: {
      label: "ASTUTE RAG PAPER",
      href: "https://arxiv.org/abs/2410.07176",
    },
    presentation: {
      label: "PROJECT PRESENTATION",
      href: "https://docs.google.com/presentation/d/1EEn4TS_AIj_fciUa4-jtFux3lafq9xPP_jzAAeani5E/edit?usp=sharing",
    },
    sections: [
      {
        title: "2-1. 연구 배경 및 목표",
        blocks: [
          {
            title: "Knowledge Conflict",
            items: [
              "LLM의 내부 지식과 검색 문서가 서로 다른 답을 제시할 때 지식 충돌 발생",
              "현실의 검색 결과에는 불완전하거나 무관한 문서가 포함되므로 검색 노이즈를 완전히 피하기 어려움",
              "일반 RAG는 검색 결과를 그대로 신뢰하기 때문에 잘못된 외부 문서가 답변 품질을 떨어뜨릴 수 있음",
            ],
          },
          {
            title: "연구 목표",
            items: [
              "검색 결과와 모델 내부 지식을 함께 활용하는 Astute RAG 재현",
              "불완전한 Retrieval 환경에서 일반 RAG보다 안정적인 정확도를 보이는지 검증",
              "검색 정밀도 변화에 따른 성능을 비교해 지식 충돌 대응 강건성 분석",
            ],
          },
        ],
        images: [
          {
            src: "/projects/knowledge-conflicts/presentation/knowledge-conflict.png",
            alt: "LLM 내부 지식과 RAG 검색 결과의 정답 여부에 따라 발생하는 지식 충돌 유형",
            caption: "KNOWLEDGE CONFLICT",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "2-2. Astute RAG",
        blocks: [
          {
            title: "핵심 접근",
            items: [
              "질문에 대해 LLM의 내부 지식으로 내부 문서를 적응적으로 생성",
              "검색으로 확보한 외부 문서와 내부 문서를 출처 정보와 함께 통합",
              "동일한 답을 지지하는 문서끼리 그룹화하고 무관한 문서를 분리",
              "그룹별 근거와 내부·외부 지식의 일관성을 비교해 최종 답변 선택",
            ],
          },
        ],
        images: [
          {
            src: "/projects/knowledge-conflicts/presentation/astute-rag-overview.png",
            alt: "내부 문서 생성부터 지식 통합과 답변 확정까지의 Astute RAG 전체 흐름",
            caption: "ASTUTE RAG PIPELINE",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "2-3. 구현 과정",
        blocks: [
          {
            title: "Retrieval Augment",
            items: [
              "SERPER API로 최대 30개의 검색 결과와 링크·스니펫 수집",
              "접근 가능한 페이지를 크롤링하고 스니펫을 포함하는 문단을 외부 문서로 구성",
            ],
          },
          {
            title: "Internal & External Passages",
            items: [
              "정보가 불명확할 때 ‘I don’t know’를 출력하도록 하는 프롬프트로 내부 문서 생성",
              "외부 문서와 내부 문서에 source 메타데이터를 부여해 출처를 구분한 채 결합",
            ],
          },
          {
            title: "Consolidation & Finalization",
            items: [
              "같은 답을 지지하는 문서를 그룹화하고 질문과 무관한 문서를 제거",
              "LLM-as-a-judge로 각 문서 그룹의 신뢰도를 평가해 가장 근거가 강한 답변 확정",
            ],
          },
        ],
        images: [
          {
            src: "/projects/knowledge-conflicts/presentation/retrieval-augment.png",
            alt: "SERPER API 검색 결과를 크롤링해 외부 문서를 만드는 구현 예시",
            caption: "RETRIEVAL AUGMENT",
            className: "overview-wide",
          },
          {
            src: "/projects/knowledge-conflicts/presentation/consolidation.png",
            alt: "서로 같은 답을 주장하는 내부 및 외부 문서를 그룹화하는 과정",
            caption: "KNOWLEDGE CONSOLIDATION",
            className: "overview-wide",
          },
          {
            src: "/projects/knowledge-conflicts/presentation/finalize-answer.png",
            alt: "문서 그룹별 신뢰도를 평가해 최종 답변을 선택하는 과정",
            caption: "ANSWER FINALIZATION",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "2-4. 정확도 재현 실험",
        blocks: [
          {
            title: "실험 설계",
            items: [
              "NQ·TriviaQA·BioASQ·PopQA 데이터셋으로 일반 지식과 전문·희소 지식 질의 평가",
              "No RAG·Baseline RAG·Astute RAG를 동일한 모델과 조건에서 비교",
              "최종 답변이 데이터셋의 정답을 포함하는지를 기준으로 Accuracy 측정",
            ],
          },
          {
            title: "재현 결과",
            items: [
              "Mistral-Nemo 12B: Overall Accuracy 66.4로 Baseline RAG 59.8 대비 향상",
              "Gemini-2.5 Flash: Overall Accuracy 70.2로 Baseline RAG 61.0 대비 향상",
              "두 모델 모두 논문과 동일하게 Astute RAG가 Baseline보다 높은 성능을 보이는 경향 재현",
            ],
          },
        ],
        images: [
          {
            src: "/projects/knowledge-conflicts/presentation/mistral-results.png",
            alt: "Mistral-Nemo에서 논문 결과와 재현 결과를 비교한 정확도 표",
            caption: "MISTRAL-NEMO REPRODUCTION",
            className: "overview-wide",
          },
          {
            src: "/projects/knowledge-conflicts/presentation/gemini-results.png",
            alt: "Gemini 모델에서 논문 결과와 재현 결과를 비교한 정확도 표",
            caption: "GEMINI REPRODUCTION",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "2-5. 검색 품질별 강건성",
        blocks: [
          {
            title: "평가 방법",
            items: [
              "검색 결과 중 정답 근거가 포함된 비율을 Retrieval Precision으로 정의",
              "테스트 데이터를 Retrieval Precision 구간별로 그룹화한 뒤 각 구간의 Accuracy 측정",
              "검색 품질이 0%에서 100%로 달라질 때 방법별 성능 변화 곡선 비교",
            ],
          },
          {
            title: "분석 결과",
            items: [
              "검색 정밀도가 낮은 최악의 구간에서도 Astute RAG는 Baseline보다 완만한 성능 하락을 보임",
              "외부 검색 결과만 따르지 않고 모델 내부 문서까지 함께 평가해 전반적으로 더 높은 강건성 확보",
              "80~90% 구간에서는 모델 자체 지식의 영향으로 Baseline보다 소폭 낮아지는 예외도 확인",
            ],
          },
        ],
        images: [
          {
            src: "/projects/knowledge-conflicts/presentation/robustness-results.png",
            alt: "Retrieval Precision 변화에 따른 Astute RAG와 일반 RAG의 정확도 비교",
            caption: "ROBUSTNESS BY RETRIEVAL PRECISION",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "2-6. 결론",
        blocks: [
          {
            title: "주요 성과",
            items: [
              "Astute RAG 논문의 핵심 알고리즘과 검색·통합·평가 파이프라인 구현",
              "Mistral-Nemo와 Gemini-2.5 Flash에서 Baseline 대비 성능 향상 경향 재현",
              "검색 품질이 낮아져 지식 충돌이 커지는 환경에서도 내부 지식을 활용해 더 안정적인 답변 생성",
            ],
          },
          {
            title: "의의 및 한계",
            items: [
              "불완전한 검색을 피하는 대신 내부·외부 지식의 신뢰도를 비교하는 실용적 대응 방식 검증",
              "성능이 검색 코퍼스의 최신성과 기반 LLM의 내부 지식 품질에도 영향을 받는다는 점 확인",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "handy-sign-language",
    index: "03",
    title: "Handy Sign Language Detection",
    type: "OPEN-SOURCE EXTENSION",
    period: "2024",
    summary: "손 랜드마크 기반 수어 인식 범위를 확장한 오픈소스 프로젝트",
    description: "기존 10개 단어 인식 프로젝트를 확장해 숫자 10개와 알파벳 26개를 인식하도록 개선하고, 문장 자동완성과 음성 출력 기능을 연결했습니다.",
    contributions: [
      "MediaPipe 21개 손 랜드마크를 입력으로 사용하는 1D CNN 분류 모델 구현",
      "인식 클래스를 숫자 10개와 알파벳 26개로 확장",
      "SBERT·LLM 자동완성, TTS 비교 및 제스처 제어 기능 추가",
    ],
    stack: ["Python", "TensorFlow", "Keras", "MediaPipe", "1D CNN", "SBERT", "TTS"],
    github: "https://github.com/kimsehan11/Handy-Sign-Language-Detection",
    sections: [
      {
        title: "3-1. 프로젝트 개요",
        blocks: [
          {
            title: "배경 및 문제점",
            items: [
              "기존 오픈소스는 BAD·HELLO·YES 등 사전에 정의된 10개 단어 인식에 한정",
              "정해진 단어만 분류하는 방식으로는 사용자가 원하는 문장을 자유롭게 구성하기 어려움",
              "인식 결과를 실제 의사소통으로 연결할 자막·자동완성·음성 출력 기능이 필요",
            ],
          },
          {
            title: "확장 목표",
            items: [
              "인식 범위를 숫자 0~9와 알파벳 A~Z의 총 36개 클래스로 확장",
              "알파벳을 연속 입력해 단어와 문장을 구성하는 실시간 자막 UX 구현",
              "추천·자동완성·TTS를 결합해 손동작부터 음성 의사소통까지 하나의 흐름으로 연결",
            ],
          },
        ],
        images: [
          {
            src: "/projects/handy-sign/original-signs.png",
            alt: "기존 프로젝트에서 인식하도록 프로그래밍된 10개의 단어 수어",
            caption: "ORIGINAL 10-SIGN SCOPE",
            className: "overview-wide",
          },
        ],
      },
      {
        title: "3-2. 데이터 구축",
        blocks: [
          {
            title: "학습 데이터",
            items: [
              "숫자 10개와 알파벳 26개를 합친 총 36개 클래스 구성",
              "저장소 기준 총 15,115장의 웹캠 이미지 수집",
              "숫자 클래스는 클래스별 200장 이상, 알파벳 클래스는 대부분 클래스별 470장 구성",
            ],
          },
          {
            title: "랜드마크 전처리",
            items: [
              "각 이미지에 원본·좌우 반전·밝기 증가 변형을 적용해 데이터 증강",
              "MediaPipe Hands로 21개 손 랜드마크의 x·y 좌표, 총 42개 특징 추출",
              "42개 특징이 정상 추출된 샘플만 숫자와 알파벳 데이터셋으로 분리해 Pickle 저장",
            ],
          },
        ],
        images: [
          {
            src: "/projects/handy-sign/digit-0.jpg",
            alt: "숫자 0 손동작 학습 이미지 예시",
            caption: "DIGIT 0",
          },
          {
            src: "/projects/handy-sign/digit-1.jpg",
            alt: "숫자 1 손동작 학습 이미지 예시",
            caption: "DIGIT 1",
          },
          {
            src: "/projects/handy-sign/alphabet-a.jpg",
            alt: "알파벳 A 손동작 학습 이미지 예시",
            caption: "ALPHABET A",
          },
          {
            src: "/projects/handy-sign/alphabet-z.jpg",
            alt: "알파벳 Z 손동작 학습 이미지 예시",
            caption: "ALPHABET Z",
          },
        ],
      },
      {
        title: "3-3. 손동작 인식 모델",
        blocks: [
          {
            title: "이중 1D CNN",
            items: [
              "숫자 10개와 알파벳 26개를 각각 전담하는 두 개의 분류 모델 학습",
              "입력 형태는 21개 랜드마크 × 2차원 좌표",
              "Conv1D 64 → Batch Normalization → MaxPooling → Conv1D 128 → Dense 64 구조",
              "Dropout 0.3과 Softmax 출력층을 적용하고 Adam·Categorical Cross-Entropy로 최적화",
            ],
          },
          {
            title: "학습 및 검증",
            items: [
              "전체 데이터를 Train·Validation·Test로 분리하고 클래스 비율을 유지하도록 Stratified Split 적용",
              "20 Epoch, Batch Size 16으로 학습",
              "숫자와 알파벳 모델 각각 Validation Accuracy와 Test Accuracy를 평가하도록 구현",
            ],
          },
        ],
      },
      {
        title: "3-4. 실시간 인식 파이프라인",
        blocks: [
          {
            title: "웹캠 추론",
            items: [
              "OpenCV 웹캠 프레임을 좌우 반전하고 MediaPipe Hands로 손과 랜드마크 추적",
              "오른손은 숫자 모델, 왼손은 알파벳 모델로 라우팅해 목적에 맞는 제스처 해석",
              "예측 클래스와 손의 Bounding Box를 실시간 화면에 표시",
            ],
          },
          {
            title: "오입력 방지",
            items: [
              "동일한 제스처를 약 1초 동안 유지해야 입력되도록 Hold 방식 적용",
              "이전 프레임과의 랜드마크 변화량이 임계값 0.005 이하일 때만 문자 추가",
              "손이 화면 밖으로 나가면 입력 상태를 초기화해 의도하지 않은 반복 입력 완화",
            ],
          },
        ],
      },
      {
        title: "3-5. 추천 및 자동완성",
        blocks: [
          {
            title: "단어 추천",
            items: [
              "unigram_freq.csv의 단어 빈도를 기반으로 현재 입력 Prefix와 일치하는 상위 3개 단어 추천",
              "화면의 추천 영역을 손가락으로 터치하거나 숫자 제스처 1·2·3으로 선택",
              "추천 단어가 선택되면 입력 중인 글자를 완성 단어로 교체하고 자동으로 공백 추가",
            ],
          },
          {
            title: "문장 자동완성",
            items: [
              "문장 DB에서 Prefix가 직접 일치하는 문장을 우선 탐색",
              "직접 일치가 없으면 all-MiniLM-L6-v2 SBERT 임베딩과 Cosine Similarity로 유사 문장 검색",
              "유사도 0.6 이상의 결과가 없을 때 소형 텍스트 생성 모델로 문장 뒷부분을 생성",
              "추천 Tail을 회색 자막과 PUSH 영역으로 표시하고 터치 또는 숫자 4 제스처로 반영",
            ],
          },
        ],
      },
      {
        title: "3-6. 제스처 기반 사용자 경험",
        blocks: [
          {
            title: "숫자 제스처 제어",
            items: [
              "0: 마지막 입력 삭제, 9: 띄어쓰기",
              "1·2·3: 추천 단어 선택, 4: 추천 문장 자동완성 적용",
              "5: 현재 문장 음성 출력, 6: 프로그램 종료",
            ],
          },
          {
            title: "자막과 음성 출력",
            items: [
              "입력 문장을 여러 줄의 실시간 자막으로 표시하고 화면에서는 공백을 밑줄로 시각화",
              "pyttsx3로 네트워크 연결 없이 현재 문장을 음성으로 출력",
              "gTTS·pyttsx3·Edge TTS의 응답 시간을 반복 측정하는 비교 실험 코드 구성",
            ],
          },
          {
            title: "적응형 문장 DB",
            items: [
              "음성 출력한 문장을 sentences_db.txt에 중복 없이 자동 저장",
              "최대 1,000개 문장을 유지하고 초과 시 오래된 문장부터 제거",
              "사용할수록 실제 발화 문장이 자동완성 후보로 축적되는 개인화 기반 마련",
            ],
          },
        ],
      },
      {
        title: "3-7. 결과 및 개선 방향",
        blocks: [
          {
            title: "주요 성과",
            items: [
              "10개 고정 단어 인식에서 숫자 10개·알파벳 26개 기반 자유 문장 입력으로 범위 확장",
              "손동작 인식·실시간 자막·단어 추천·문장 자동완성·음성 출력을 단일 애플리케이션으로 통합",
              "터치와 숫자 제스처를 병행해 키보드 없이 추천 선택과 프로그램 제어가 가능한 UX 구현",
            ],
          },
          {
            title: "한계 및 개선 방향",
            items: [
              "조명·배경·카메라 거리와 개인별 손 모양 변화에 대한 추가 데이터와 정량 평가 필요",
              "좌우 손 구분에 기능이 고정되어 있어 사용자 설정과 양손 동시 입력 처리 개선 필요",
              "클래스별 Confusion Matrix와 실제 사용자 문장 완성 시간 등 End-to-End 평가 추가 필요",
            ],
          },
        ],
      },
    ],
  },
];
