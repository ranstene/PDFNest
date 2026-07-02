(function () {
  const state = {
    mergeFiles: [],
    mergePages: [],
    imageFiles: [],
    spreadsheetFiles: [],
    wordFiles: [],
    textFiles: [],
    splitFile: null,
    splitPages: [],
    compressFile: null,
    watermarkFile: null,
    pageNumberFile: null,
    signatureFile: null,
    signatureDrawing: false,
    signatureHasInk: false,
    signatureFullDrawing: false,
    signatureFullDrawHasInk: false,
    signatureFullDrawPage: null,
    signatureFullDrawFileId: null,
    signatureFullPageCount: 0,
    signatureFullRenderId: 0,
    signatureFullScale: 1,
    signatureFullTool: "draw",
    signaturePlacementDrag: null,
    metadataFile: null,
    annotateFile: null,
    annotationDrawing: false,
    annotationHasInk: false,
    flattenFile: null,
    cropFile: null,
    addTextFile: null,
    removePasswordFile: null,
    pdfImageFile: null,
    pdfExtractFile: null,
    pdfTextFile: null,
    pdfPasswords: new Map(),
    pendingPasswordRequest: null,
    deferredInstallPrompt: null,
    downloadHistory: [],
    outputUrls: {},
    activeToolId: null,
    language: "en",
    recentToolIds: [],
    nextHistoryId: 1,
    planRuns: {
      merge: 0,
      split: 0
    },
    previewRuns: {
      merge: 0,
      split: 0
    },
    drag: null,
    pageDrag: null,
    fileIds: new WeakMap(),
    nextFileId: 1
  };

  const els = {
    themeToggle: document.getElementById("themeToggle"),
    toolNavToggle: document.getElementById("toolNavToggle"),
    toolNavPanel: document.getElementById("toolsNavPanel"),
    toolNavClose: document.getElementById("toolNavClose"),
    toolNavBackdrop: document.getElementById("toolNavBackdrop"),
    toolSearch: document.getElementById("toolSearch"),
    toolCategoryFilters: document.getElementById("toolCategoryFilters"),
    toolSearchEmpty: document.getElementById("toolSearchEmpty"),
    languageSelect: document.getElementById("languageSelect"),
    settingsPanel: document.getElementById("settingsPanel"),
    recentToolsBar: document.getElementById("recentToolsBar"),
    recentToolsLabel: document.getElementById("recentToolsLabel"),
    recentToolsList: document.getElementById("recentToolsList"),
    toolsMenuRecent: document.getElementById("toolsMenuRecent"),
    toolsMenuRecentLabel: document.getElementById("toolsMenuRecentLabel"),
    toolsMenuRecentList: document.getElementById("toolsMenuRecentList"),
    homeUploadFiles: document.getElementById("homeUploadFiles"),
    homeUploadZone: document.getElementById("homeUploadZone"),
    homeUploadStatus: document.getElementById("homeUploadStatus"),
    quickAllTools: document.getElementById("quickAllTools"),
    activeToolNote: document.getElementById("activeToolNote"),
    installButton: document.getElementById("installButton"),
    downloadHistoryList: document.getElementById("downloadHistoryList"),
    downloadHistoryCount: document.getElementById("downloadHistoryCount"),
    downloadHistoryClear: document.getElementById("downloadHistoryClear"),
    downloadHistoryPanel: document.getElementById("downloadHistoryPanel"),
    pdfPasswordDialog: document.getElementById("pdfPasswordDialog"),
    pdfPasswordForm: document.getElementById("pdfPasswordForm"),
    pdfPasswordTitle: document.getElementById("pdfPasswordTitle"),
    pdfPasswordMessage: document.getElementById("pdfPasswordMessage"),
    pdfPasswordInput: document.getElementById("pdfPasswordInput"),
    pdfPasswordCancel: document.getElementById("pdfPasswordCancel"),
    pdfPasswordSubmit: document.getElementById("pdfPasswordSubmit"),
    pdfPasswordError: document.getElementById("pdfPasswordError"),
    mergeFiles: document.getElementById("mergeFiles"),
    mergeList: document.getElementById("mergeList"),
    mergeSummary: document.getElementById("mergeSummary"),
    mergePreview: document.getElementById("mergePreview"),
    mergePreviewSection: document.getElementById("mergePreviewSection"),
    mergeRotateLeft: document.getElementById("mergeRotateLeft"),
    mergeRotateRight: document.getElementById("mergeRotateRight"),
    mergeResetPages: document.getElementById("mergeResetPages"),
    mergeButton: document.getElementById("mergeButton"),
    mergeClear: document.getElementById("mergeClear"),
    mergeResult: document.getElementById("mergeResult"),
    splitFile: document.getElementById("splitFile"),
    splitList: document.getElementById("splitList"),
    splitSummary: document.getElementById("splitSummary"),
    splitPreview: document.getElementById("splitPreview"),
    splitPreviewSection: document.getElementById("splitPreviewSection"),
    splitRotateLeft: document.getElementById("splitRotateLeft"),
    splitRotateRight: document.getElementById("splitRotateRight"),
    splitResetPages: document.getElementById("splitResetPages"),
    splitButton: document.getElementById("splitButton"),
    splitClear: document.getElementById("splitClear"),
    splitResult: document.getElementById("splitResult"),
    compressFile: document.getElementById("compressFile"),
    compressList: document.getElementById("compressList"),
    compressSummary: document.getElementById("compressSummary"),
    compressButton: document.getElementById("compressButton"),
    compressClear: document.getElementById("compressClear"),
    compressResult: document.getElementById("compressResult"),
    watermarkFile: document.getElementById("watermarkFile"),
    watermarkList: document.getElementById("watermarkList"),
    watermarkSummary: document.getElementById("watermarkSummary"),
    watermarkText: document.getElementById("watermarkText"),
    watermarkPosition: document.getElementById("watermarkPosition"),
    watermarkFontSize: document.getElementById("watermarkFontSize"),
    watermarkOpacity: document.getElementById("watermarkOpacity"),
    watermarkButton: document.getElementById("watermarkButton"),
    watermarkClear: document.getElementById("watermarkClear"),
    watermarkResult: document.getElementById("watermarkResult"),
    pageNumberFile: document.getElementById("pageNumberFile"),
    pageNumberList: document.getElementById("pageNumberList"),
    pageNumberSummary: document.getElementById("pageNumberSummary"),
    pageNumberPosition: document.getElementById("pageNumberPosition"),
    pageNumberFormat: document.getElementById("pageNumberFormat"),
    pageNumberStart: document.getElementById("pageNumberStart"),
    pageNumberFontSize: document.getElementById("pageNumberFontSize"),
    pageNumberButton: document.getElementById("pageNumberButton"),
    pageNumberClear: document.getElementById("pageNumberClear"),
    pageNumberResult: document.getElementById("pageNumberResult"),
    signatureFile: document.getElementById("signatureFile"),
    signatureList: document.getElementById("signatureList"),
    signatureSummary: document.getElementById("signatureSummary"),
    signatureMode: document.getElementById("signatureMode"),
    signaturePage: document.getElementById("signaturePage"),
    signaturePosition: document.getElementById("signaturePosition"),
    signatureWidth: document.getElementById("signatureWidth"),
    signatureColor: document.getElementById("signatureColor"),
    signatureStrokeWidth: document.getElementById("signatureStrokeWidth"),
    signatureX: document.getElementById("signatureX"),
    signatureY: document.getElementById("signatureY"),
    signatureText: document.getElementById("signatureText"),
    signaturePanel: document.getElementById("signaturePanel"),
    signatureCanvas: document.getElementById("signatureCanvas"),
    signaturePadClear: document.getElementById("signaturePadClear"),
    signatureButton: document.getElementById("signatureButton"),
    signatureClear: document.getElementById("signatureClear"),
    signatureFullButton: document.getElementById("signatureFullButton"),
    signatureFullModal: document.getElementById("signatureFullModal"),
    signatureFullClose: document.getElementById("signatureFullClose"),
    signatureFullPrev: document.getElementById("signatureFullPrev"),
    signatureFullNext: document.getElementById("signatureFullNext"),
    signatureFullClear: document.getElementById("signatureFullClear"),
    signatureFullSign: document.getElementById("signatureFullSign"),
    signatureFullStatus: document.getElementById("signatureFullStatus"),
    signatureFullToolDraw: document.getElementById("signatureFullToolDraw"),
    signatureFullToolPlace: document.getElementById("signatureFullToolPlace"),
    signatureFullStageWrap: document.getElementById("signatureFullStageWrap"),
    signatureFullStage: document.getElementById("signatureFullStage"),
    signatureFullCanvas: document.getElementById("signatureFullCanvas"),
    signatureFullDrawCanvas: document.getElementById("signatureFullDrawCanvas"),
    signaturePlacementPreview: document.getElementById("signaturePlacementPreview"),
    signaturePlacementLabel: document.getElementById("signaturePlacementLabel"),
    signatureResult: document.getElementById("signatureResult"),
    metadataFile: document.getElementById("metadataFile"),
    metadataList: document.getElementById("metadataList"),
    metadataSummary: document.getElementById("metadataSummary"),
    metadataTitle: document.getElementById("metadataTitle"),
    metadataAuthor: document.getElementById("metadataAuthor"),
    metadataSubject: document.getElementById("metadataSubject"),
    metadataKeywords: document.getElementById("metadataKeywords"),
    metadataButton: document.getElementById("metadataButton"),
    metadataClear: document.getElementById("metadataClear"),
    metadataResult: document.getElementById("metadataResult"),
    annotateFile: document.getElementById("annotateFile"),
    annotateList: document.getElementById("annotateList"),
    annotateSummary: document.getElementById("annotateSummary"),
    annotateType: document.getElementById("annotateType"),
    annotatePage: document.getElementById("annotatePage"),
    annotateText: document.getElementById("annotateText"),
    annotateColor: document.getElementById("annotateColor"),
    annotateOpacity: document.getElementById("annotateOpacity"),
    annotateFontSize: document.getElementById("annotateFontSize"),
    annotateX: document.getElementById("annotateX"),
    annotateY: document.getElementById("annotateY"),
    annotateWidth: document.getElementById("annotateWidth"),
    annotateHeight: document.getElementById("annotateHeight"),
    annotationDrawPanel: document.getElementById("annotationDrawPanel"),
    annotationCanvas: document.getElementById("annotationCanvas"),
    annotationPadClear: document.getElementById("annotationPadClear"),
    annotateButton: document.getElementById("annotateButton"),
    annotateClear: document.getElementById("annotateClear"),
    annotateResult: document.getElementById("annotateResult"),
    flattenFile: document.getElementById("flattenFile"),
    flattenList: document.getElementById("flattenList"),
    flattenSummary: document.getElementById("flattenSummary"),
    flattenScale: document.getElementById("flattenScale"),
    flattenButton: document.getElementById("flattenButton"),
    flattenClear: document.getElementById("flattenClear"),
    flattenResult: document.getElementById("flattenResult"),
    cropFile: document.getElementById("cropFile"),
    cropList: document.getElementById("cropList"),
    cropSummary: document.getElementById("cropSummary"),
    cropPageSelection: document.getElementById("cropPageSelection"),
    cropTop: document.getElementById("cropTop"),
    cropRight: document.getElementById("cropRight"),
    cropBottom: document.getElementById("cropBottom"),
    cropLeft: document.getElementById("cropLeft"),
    cropButton: document.getElementById("cropButton"),
    cropClear: document.getElementById("cropClear"),
    cropResult: document.getElementById("cropResult"),
    addTextFile: document.getElementById("addTextFile"),
    addTextList: document.getElementById("addTextList"),
    addTextSummary: document.getElementById("addTextSummary"),
    addTextValue: document.getElementById("addTextValue"),
    addTextPage: document.getElementById("addTextPage"),
    addTextFontSize: document.getElementById("addTextFontSize"),
    addTextColor: document.getElementById("addTextColor"),
    addTextX: document.getElementById("addTextX"),
    addTextY: document.getElementById("addTextY"),
    addTextWidth: document.getElementById("addTextWidth"),
    addTextButton: document.getElementById("addTextButton"),
    addTextClear: document.getElementById("addTextClear"),
    addTextResult: document.getElementById("addTextResult"),
    removePasswordFile: document.getElementById("removePasswordFile"),
    removePasswordList: document.getElementById("removePasswordList"),
    removePasswordSummary: document.getElementById("removePasswordSummary"),
    removePasswordScale: document.getElementById("removePasswordScale"),
    removePasswordButton: document.getElementById("removePasswordButton"),
    removePasswordClear: document.getElementById("removePasswordClear"),
    removePasswordResult: document.getElementById("removePasswordResult"),
    pageSelection: document.getElementById("pageSelection"),
    imageFiles: document.getElementById("imageFiles"),
    imageList: document.getElementById("imageList"),
    imageSummary: document.getElementById("imageSummary"),
    imagePageSize: document.getElementById("imagePageSize"),
    imageOrientation: document.getElementById("imageOrientation"),
    imageMargin: document.getElementById("imageMargin"),
    imageFitMode: document.getElementById("imageFitMode"),
    imageButton: document.getElementById("imageButton"),
    imageClear: document.getElementById("imageClear"),
    imageResult: document.getElementById("imageResult"),
    spreadsheetFiles: document.getElementById("spreadsheetFiles"),
    spreadsheetList: document.getElementById("spreadsheetList"),
    spreadsheetSummary: document.getElementById("spreadsheetSummary"),
    spreadsheetPageSize: document.getElementById("spreadsheetPageSize"),
    spreadsheetOrientation: document.getElementById("spreadsheetOrientation"),
    spreadsheetMargin: document.getElementById("spreadsheetMargin"),
    spreadsheetFitWidth: document.getElementById("spreadsheetFitWidth"),
    spreadsheetGridlines: document.getElementById("spreadsheetGridlines"),
    spreadsheetButton: document.getElementById("spreadsheetButton"),
    spreadsheetClear: document.getElementById("spreadsheetClear"),
    spreadsheetResult: document.getElementById("spreadsheetResult"),
    wordFiles: document.getElementById("wordFiles"),
    wordList: document.getElementById("wordList"),
    wordSummary: document.getElementById("wordSummary"),
    wordPageSize: document.getElementById("wordPageSize"),
    wordOrientation: document.getElementById("wordOrientation"),
    wordMargin: document.getElementById("wordMargin"),
    wordFontSize: document.getElementById("wordFontSize"),
    wordButton: document.getElementById("wordButton"),
    wordClear: document.getElementById("wordClear"),
    wordResult: document.getElementById("wordResult"),
    textFiles: document.getElementById("textFiles"),
    textList: document.getElementById("textList"),
    textSummary: document.getElementById("textSummary"),
    textPageSize: document.getElementById("textPageSize"),
    textOrientation: document.getElementById("textOrientation"),
    textMargin: document.getElementById("textMargin"),
    textFontSize: document.getElementById("textFontSize"),
    textButton: document.getElementById("textButton"),
    textClear: document.getElementById("textClear"),
    textResult: document.getElementById("textResult"),
    pdfImageFile: document.getElementById("pdfImageFile"),
    pdfImageList: document.getElementById("pdfImageList"),
    pdfImageSummary: document.getElementById("pdfImageSummary"),
    pdfImageFormat: document.getElementById("pdfImageFormat"),
    pdfImageScale: document.getElementById("pdfImageScale"),
    pdfImagePageSelection: document.getElementById("pdfImagePageSelection"),
    pdfImageButton: document.getElementById("pdfImageButton"),
    pdfImageClear: document.getElementById("pdfImageClear"),
    pdfImageResult: document.getElementById("pdfImageResult"),
    pdfExtractFile: document.getElementById("pdfExtractFile"),
    pdfExtractList: document.getElementById("pdfExtractList"),
    pdfExtractSummary: document.getElementById("pdfExtractSummary"),
    pdfExtractPageSelection: document.getElementById("pdfExtractPageSelection"),
    pdfExtractMinWidth: document.getElementById("pdfExtractMinWidth"),
    pdfExtractButton: document.getElementById("pdfExtractButton"),
    pdfExtractClear: document.getElementById("pdfExtractClear"),
    pdfExtractResult: document.getElementById("pdfExtractResult"),
    pdfTextFile: document.getElementById("pdfTextFile"),
    pdfTextList: document.getElementById("pdfTextList"),
    pdfTextSummary: document.getElementById("pdfTextSummary"),
    pdfTextPageSelection: document.getElementById("pdfTextPageSelection"),
    pdfTextPageBreaks: document.getElementById("pdfTextPageBreaks"),
    pdfTextButton: document.getElementById("pdfTextButton"),
    pdfTextClear: document.getElementById("pdfTextClear"),
    pdfTextResult: document.getElementById("pdfTextResult")
  };

  const toolResults = {
    merge: els.mergeResult,
    split: els.splitResult,
    compress: els.compressResult,
    watermark: els.watermarkResult,
    pageNumbers: els.pageNumberResult,
    signature: els.signatureResult,
    metadata: els.metadataResult,
    annotate: els.annotateResult,
    flatten: els.flattenResult,
    crop: els.cropResult,
    addText: els.addTextResult,
    removePassword: els.removePasswordResult,
    image: els.imageResult,
    spreadsheet: els.spreadsheetResult,
    word: els.wordResult,
    text: els.textResult,
    pdfImage: els.pdfImageResult,
    pdfExtract: els.pdfExtractResult,
    pdfText: els.pdfTextResult
  };

  const toolLabels = {
    compress: "Compress PDF",
    image: "Image to PDF",
    merge: "Merge PDFs",
    metadata: "Edit Metadata",
    annotate: "Annotate PDF",
    flatten: "Flatten PDF",
    crop: "Crop PDF",
    addText: "Add Text",
    removePassword: "Remove Password",
    pdfExtract: "Extract Images",
    pageNumbers: "Page Numbers",
    pdfImage: "PDF to Images",
    pdfText: "PDF to TXT",
    signature: "Sign PDF",
    split: "Split PDF",
    spreadsheet: "Spreadsheet to PDF",
    text: "TXT to PDF",
    watermark: "Watermark PDF",
    word: "Word to PDF"
  };

  const pageSizes = {
    a4: [595.28, 841.89],
    letter: [612, 792]
  };

  const spreadsheetLimits = {
    columns: 18,
    rows: 1000
  };

  const largeFileLimits = {
    document: 25 * 1024 * 1024,
    image: 15 * 1024 * 1024,
    pdf: 75 * 1024 * 1024,
    text: 5 * 1024 * 1024
  };

  const toolCatalog = [
    {
      category: "edit",
      id: "merge-card",
      keywords: "merge combine join pdf pages order"
    },
    {
      category: "edit",
      id: "split-card",
      keywords: "split extract page range first last every zip"
    },
    {
      category: "edit",
      id: "compress-card",
      keywords: "compress reduce optimize smaller pdf"
    },
    {
      category: "edit",
      id: "watermark-card",
      keywords: "watermark stamp confidential draft text pdf"
    },
    {
      category: "edit",
      id: "page-numbers-card",
      keywords: "page numbers numbering footer header labels"
    },
    {
      category: "edit",
      id: "signature-card",
      keywords: "sign signature draw type approve pdf"
    },
    {
      category: "edit",
      id: "metadata-card",
      keywords: "metadata title author subject keywords document properties"
    },
    {
      category: "edit",
      id: "annotate-card",
      keywords: "annotate annotation note text highlight rectangle draw markup pdf"
    },
    {
      category: "edit",
      id: "flatten-card",
      keywords: "flatten lock annotations form fields rasterize visible pages pdf"
    },
    {
      category: "edit",
      id: "crop-card",
      keywords: "crop trim margins cut page area pdf"
    },
    {
      category: "edit",
      id: "add-text-card",
      keywords: "add text fill pdf form fields type write"
    },
    {
      category: "edit",
      id: "remove-password-card",
      keywords: "remove password unlock protected encrypted known password pdf"
    },
    {
      category: "to-pdf",
      id: "image-card",
      keywords: "image images png jpg jpeg photo to pdf png to pdf jpg to pdf jpeg to pdf"
    },
    {
      category: "to-pdf",
      id: "spreadsheet-card",
      keywords: "spreadsheet excel xlsx csv table sheet to pdf excel to pdf csv to pdf"
    },
    {
      category: "to-pdf",
      id: "word-card",
      keywords: "word docx document office to pdf"
    },
    {
      category: "to-pdf",
      id: "text-card",
      keywords: "txt text plain notes to pdf"
    },
    {
      category: "from-pdf",
      id: "pdf-image-card",
      keywords: "pdf to image pdf to png pdf to jpg pdf to jpeg png jpg jpeg export pages"
    },
    {
      category: "from-pdf",
      id: "pdf-extract-card",
      keywords: "extract images from pdf embedded pictures photos logos assets xobject raster"
    },
    {
      category: "from-pdf",
      id: "pdf-text-card",
      keywords: "pdf to text pdf to txt extract selectable text copy readable"
    }
  ];

  const toolCategoryLabels = {
    edit: "Edit PDF",
    "from-pdf": "Convert from PDF",
    "to-pdf": "Convert to PDF"
  };

  const toolUiMap = [
    { actionId: "mergeButton", clearId: "mergeClear", clearType: "files", id: "merge-card", tool: "merge" },
    { actionId: "splitButton", clearId: "splitClear", clearType: "files", id: "split-card", tool: "split" },
    { actionId: "compressButton", clearId: "compressClear", clearType: "file", id: "compress-card", tool: "compress" },
    { actionId: "watermarkButton", clearId: "watermarkClear", clearType: "file", id: "watermark-card", tool: "watermark" },
    { actionId: "pageNumberButton", clearId: "pageNumberClear", clearType: "file", id: "page-numbers-card", tool: "pageNumbers" },
    { actionId: "signatureButton", clearId: "signatureClear", clearType: "file", id: "signature-card", tool: "signature" },
    { actionId: "metadataButton", clearId: "metadataClear", clearType: "file", id: "metadata-card", tool: "metadata" },
    { actionId: "annotateButton", clearId: "annotateClear", clearType: "file", id: "annotate-card", tool: "annotate" },
    { actionId: "flattenButton", clearId: "flattenClear", clearType: "file", id: "flatten-card", tool: "flatten" },
    { actionId: "cropButton", clearId: "cropClear", clearType: "file", id: "crop-card", tool: "crop" },
    { actionId: "addTextButton", clearId: "addTextClear", clearType: "file", id: "add-text-card", tool: "addText" },
    { actionId: "removePasswordButton", clearId: "removePasswordClear", clearType: "file", id: "remove-password-card", tool: "removePassword" },
    { actionId: "imageButton", clearId: "imageClear", clearType: "files", id: "image-card", tool: "image" },
    { actionId: "spreadsheetButton", clearId: "spreadsheetClear", clearType: "files", id: "spreadsheet-card", tool: "spreadsheet" },
    { actionId: "wordButton", clearId: "wordClear", clearType: "files", id: "word-card", tool: "word" },
    { actionId: "textButton", clearId: "textClear", clearType: "files", id: "text-card", tool: "text" },
    { actionId: "pdfImageButton", clearId: "pdfImageClear", clearType: "file", id: "pdf-image-card", tool: "pdfImage" },
    { actionId: "pdfExtractButton", clearId: "pdfExtractClear", clearType: "file", id: "pdf-extract-card", tool: "pdfExtract" },
    { actionId: "pdfTextButton", clearId: "pdfTextClear", clearType: "file", id: "pdf-text-card", tool: "pdfText" }
  ];

  const toolDescriptions = {
    addText: "Place typed text on a PDF locally without uploading.",
    annotate: "Add notes, highlights, drawings, and simple marks in your browser.",
    compress: "Reduce PDF file size locally when the document allows it.",
    crop: "Trim PDF page margins locally without sending files anywhere.",
    flatten: "Create a visible-page PDF copy that is harder to edit.",
    image: "Convert JPG and PNG images into a PDF locally.",
    merge: "Merge PDF files locally without uploading.",
    metadata: "Update PDF title, author, subject, and keywords in your browser.",
    pageNumbers: "Add page numbers to a PDF locally without uploading.",
    pdfExtract: "Extract embedded PDF images locally in your browser.",
    pdfImage: "Export PDF pages as PNG or JPG images locally.",
    pdfText: "Extract selectable PDF text to a TXT file locally.",
    removePassword: "Create an unlocked visible-page copy when you know the password.",
    signature: "Sign a PDF locally with typed or drawn signatures.",
    split: "Extract PDF pages or split every page locally.",
    spreadsheet: "Convert XLSX or CSV tables into a readable PDF locally.",
    text: "Convert TXT files into a PDF locally in your browser.",
    watermark: "Add a text watermark to a PDF locally without uploading.",
    word: "Convert DOCX text into a readable PDF locally."
  };

  const toolsMenuMeta = {
    addText: {
      badge: "New",
      description: "Fill flat forms and labels"
    },
    annotate: {
      badge: "New",
      description: "Highlight, draw, and mark up"
    },
    compress: {
      description: "Try to reduce file size"
    },
    crop: {
      badge: "New",
      description: "Trim margins and page area"
    },
    flatten: {
      description: "Lock visible page appearance"
    },
    image: {
      badge: "Popular",
      description: "Turn JPG or PNG into PDF"
    },
    merge: {
      badge: "Popular",
      description: "Combine multiple PDF files"
    },
    metadata: {
      description: "Edit title and document info"
    },
    pageNumbers: {
      description: "Add page labels to PDF"
    },
    pdfExtract: {
      badge: "New",
      description: "Save embedded images"
    },
    pdfImage: {
      badge: "Popular",
      description: "Export pages as JPG or PNG"
    },
    pdfText: {
      badge: "New",
      description: "Extract selectable text"
    },
    removePassword: {
      badge: "New",
      description: "Use a known password"
    },
    signature: {
      badge: "Popular",
      description: "Draw or type a signature"
    },
    split: {
      badge: "Popular",
      description: "Extract pages or split all"
    },
    spreadsheet: {
      description: "Convert XLSX or CSV tables"
    },
    text: {
      description: "Turn text files into PDF"
    },
    watermark: {
      description: "Add text stamps to pages"
    },
    word: {
      description: "Convert DOCX text to PDF"
    }
  };

  const localizedToolDescriptions = {
    es: {
      addText: "Coloca texto escrito en un PDF localmente sin subirlo.",
      annotate: "Agrega notas, resaltados, dibujos y marcas en el navegador.",
      compress: "Reduce el tamaño del PDF localmente cuando el documento lo permite.",
      crop: "Recorta margenes de paginas PDF sin enviar archivos.",
      flatten: "Crea una copia visual del PDF que es mas dificil de editar.",
      image: "Convierte imagenes JPG y PNG en un PDF localmente.",
      merge: "Une archivos PDF localmente sin subirlos.",
      metadata: "Actualiza titulo, autor, asunto y palabras clave del PDF.",
      pageNumbers: "Agrega numeros de pagina a un PDF localmente.",
      pdfExtract: "Extrae imagenes incrustadas del PDF en tu navegador.",
      pdfImage: "Exporta paginas PDF como imagenes PNG o JPG localmente.",
      pdfText: "Extrae texto seleccionable de PDF a un archivo TXT.",
      removePassword: "Crea una copia desbloqueada cuando conoces la contrasena.",
      signature: "Firma un PDF localmente con firma escrita o dibujada.",
      split: "Extrae paginas PDF o separa cada pagina localmente.",
      spreadsheet: "Convierte tablas XLSX o CSV en un PDF legible.",
      text: "Convierte archivos TXT en PDF localmente en tu navegador.",
      watermark: "Agrega una marca de agua de texto a un PDF sin subirlo.",
      word: "Convierte texto DOCX en un PDF legible localmente."
    },
    hi: {
      addText: "PDF पर typed text स्थानीय रूप से जोड़ें, upload नहीं.",
      annotate: "Browser में notes, highlights, drawings और marks जोड़ें.",
      compress: "Document अनुमति दे तो PDF size स्थानीय रूप से घटाएं.",
      crop: "Files भेजे बिना PDF page margins trim करें.",
      flatten: "ऐसी visible-page PDF copy बनाएं जिसे edit करना कठिन हो.",
      image: "JPG और PNG images को स्थानीय रूप से PDF में बदलें.",
      merge: "PDF files को upload किए बिना स्थानीय रूप से merge करें.",
      metadata: "Browser में PDF title, author, subject और keywords update करें.",
      pageNumbers: "PDF में page numbers स्थानीय रूप से जोड़ें.",
      pdfExtract: "Browser में PDF की embedded images निकालें.",
      pdfImage: "PDF pages को PNG या JPG images में export करें.",
      pdfText: "Selectable PDF text को TXT file में निकालें.",
      removePassword: "Password पता हो तो unlocked visible-page copy बनाएं.",
      signature: "Typed या drawn signature से PDF को स्थानीय रूप से sign करें.",
      split: "PDF pages extract करें या हर page अलग करें.",
      spreadsheet: "XLSX या CSV tables को readable PDF में बदलें.",
      text: "TXT files को browser में स्थानीय रूप से PDF बनाएं.",
      watermark: "Upload किए बिना PDF में text watermark जोड़ें.",
      word: "DOCX text को readable PDF में बदलें."
    },
    id: {
      addText: "Tambahkan teks ke PDF secara lokal tanpa mengunggah.",
      annotate: "Tambahkan catatan, sorotan, gambar, dan tanda di browser.",
      compress: "Kurangi ukuran PDF secara lokal jika dokumen memungkinkan.",
      crop: "Pangkas margin halaman PDF tanpa mengirim file.",
      flatten: "Buat salinan visual PDF yang lebih sulit diedit.",
      image: "Ubah gambar JPG dan PNG menjadi PDF secara lokal.",
      merge: "Gabungkan file PDF secara lokal tanpa mengunggah.",
      metadata: "Perbarui judul, penulis, subjek, dan kata kunci PDF.",
      pageNumbers: "Tambahkan nomor halaman ke PDF secara lokal.",
      pdfExtract: "Ekstrak gambar tertanam dari PDF di browser.",
      pdfImage: "Ekspor halaman PDF sebagai gambar PNG atau JPG.",
      pdfText: "Ekstrak teks PDF yang bisa dipilih ke file TXT.",
      removePassword: "Buat salinan terbuka saat Anda tahu kata sandinya.",
      signature: "Tanda tangani PDF secara lokal dengan teks atau gambar.",
      split: "Ekstrak halaman PDF atau pisahkan setiap halaman.",
      spreadsheet: "Ubah tabel XLSX atau CSV menjadi PDF yang mudah dibaca.",
      text: "Ubah file TXT menjadi PDF secara lokal di browser.",
      watermark: "Tambahkan watermark teks ke PDF tanpa mengunggah.",
      word: "Ubah teks DOCX menjadi PDF yang mudah dibaca."
    },
    ja: {
      addText: "PDFに入力テキストをローカルで配置します。",
      annotate: "メモ、ハイライト、描画、簡単な印をブラウザで追加します。",
      compress: "可能なPDFのファイルサイズをローカルで削減します。",
      crop: "ファイルを送信せずにPDFページの余白を切り抜きます。",
      flatten: "編集されにくい表示ページPDFコピーを作成します。",
      image: "JPGとPNG画像をローカルでPDFに変換します。",
      merge: "PDFファイルをアップロードなしでローカル結合します。",
      metadata: "PDFのタイトル、作成者、件名、キーワードを更新します。",
      pageNumbers: "PDFにページ番号をローカルで追加します。",
      pdfExtract: "PDF内の埋め込み画像をブラウザで抽出します。",
      pdfImage: "PDFページをPNGまたはJPG画像として書き出します。",
      pdfText: "選択可能なPDFテキストをTXTファイルに抽出します。",
      removePassword: "パスワードを知っているPDFの解除コピーを作成します。",
      signature: "入力または手描きの署名でPDFにローカル署名します。",
      split: "PDFページを抽出、または全ページを個別に分割します。",
      spreadsheet: "XLSXまたはCSV表を読みやすいPDFに変換します。",
      text: "TXTファイルをブラウザ内でローカルにPDF化します。",
      watermark: "アップロードせずにPDFへテキスト透かしを追加します。",
      word: "DOCXテキストを読みやすいPDFに変換します。"
    },
    ko: {
      addText: "PDF에 입력한 텍스트를 로컬로 배치합니다.",
      annotate: "브라우저에서 메모, 하이라이트, 그림, 표시를 추가합니다.",
      compress: "문서가 허용하는 경우 PDF 크기를 로컬로 줄입니다.",
      crop: "파일을 보내지 않고 PDF 페이지 여백을 자릅니다.",
      flatten: "편집하기 어려운 보이는 페이지 PDF 사본을 만듭니다.",
      image: "JPG와 PNG 이미지를 로컬에서 PDF로 변환합니다.",
      merge: "PDF 파일을 업로드 없이 로컬에서 병합합니다.",
      metadata: "PDF 제목, 작성자, 주제, 키워드를 업데이트합니다.",
      pageNumbers: "PDF에 페이지 번호를 로컬로 추가합니다.",
      pdfExtract: "PDF에 포함된 이미지를 브라우저에서 추출합니다.",
      pdfImage: "PDF 페이지를 PNG 또는 JPG 이미지로 내보냅니다.",
      pdfText: "선택 가능한 PDF 텍스트를 TXT 파일로 추출합니다.",
      removePassword: "비밀번호를 아는 PDF의 잠금 해제 사본을 만듭니다.",
      signature: "입력하거나 그린 서명으로 PDF에 로컬 서명합니다.",
      split: "PDF 페이지를 추출하거나 모든 페이지를 분할합니다.",
      spreadsheet: "XLSX 또는 CSV 표를 읽기 쉬운 PDF로 변환합니다.",
      text: "TXT 파일을 브라우저에서 로컬로 PDF로 변환합니다.",
      watermark: "업로드 없이 PDF에 텍스트 워터마크를 추가합니다.",
      word: "DOCX 텍스트를 읽기 쉬운 PDF로 변환합니다."
    },
    tl: {
      addText: "Maglagay ng typed text sa PDF nang lokal at walang upload.",
      annotate: "Magdagdag ng notes, highlights, drawing, at marks sa browser.",
      compress: "Bawasan ang PDF size locally kapag kaya ng document.",
      crop: "I-trim ang PDF page margins nang hindi nagpapadala ng files.",
      flatten: "Gumawa ng visual PDF copy na mas mahirap i-edit.",
      image: "Gawing PDF ang JPG at PNG images locally.",
      merge: "Pagsamahin ang PDF files locally nang walang upload.",
      metadata: "I-update ang PDF title, author, subject, at keywords.",
      pageNumbers: "Magdagdag ng page numbers sa PDF locally.",
      pdfExtract: "Kunin ang embedded PDF images sa browser.",
      pdfImage: "I-export ang PDF pages bilang PNG o JPG images.",
      pdfText: "Kunin ang selectable PDF text sa isang TXT file.",
      removePassword: "Gumawa ng unlocked copy kapag alam mo ang password.",
      signature: "Pirmahan ang PDF locally gamit ang typed o drawn signature.",
      split: "Kunin ang PDF pages o hatiin ang bawat page locally.",
      spreadsheet: "Gawing readable PDF ang XLSX o CSV tables.",
      text: "Gawing PDF ang TXT files locally sa browser.",
      watermark: "Magdagdag ng text watermark sa PDF nang walang upload.",
      word: "Gawing readable PDF ang DOCX text locally."
    },
    zh: {
      addText: "在本地为 PDF 放置输入文本，无需上传。",
      annotate: "在浏览器中添加备注、高亮、绘图和标记。",
      compress: "在文档允许时本地减小 PDF 文件大小。",
      crop: "无需发送文件即可裁剪 PDF 页面边距。",
      flatten: "创建更难编辑的可视页面 PDF 副本。",
      image: "在本地将 JPG 和 PNG 图片转换为 PDF。",
      merge: "无需上传即可在本地合并 PDF 文件。",
      metadata: "在浏览器中更新 PDF 标题、作者、主题和关键词。",
      pageNumbers: "在本地为 PDF 添加页码。",
      pdfExtract: "在浏览器中提取 PDF 内嵌图片。",
      pdfImage: "将 PDF 页面导出为 PNG 或 JPG 图片。",
      pdfText: "将可选择的 PDF 文本提取为 TXT 文件。",
      removePassword: "知道密码时创建已解锁的可视页面副本。",
      signature: "使用输入或手绘签名在本地签署 PDF。",
      split: "在本地提取 PDF 页面或逐页拆分。",
      spreadsheet: "将 XLSX 或 CSV 表格转换为易读 PDF。",
      text: "在浏览器中本地将 TXT 文件转换为 PDF。",
      watermark: "无需上传即可为 PDF 添加文字水印。",
      word: "将 DOCX 文本转换为易读 PDF。"
    }
  };

  const localizedMenuDescriptions = {
    es: {
      addText: "Rellena formularios y etiquetas",
      annotate: "Resalta, dibuja y marca",
      compress: "Intenta reducir el tamano",
      crop: "Recorta margenes y pagina",
      flatten: "Bloquea la apariencia visible",
      image: "Convierte JPG o PNG a PDF",
      merge: "Combina varios PDF",
      metadata: "Edita titulo e informacion",
      pageNumbers: "Agrega etiquetas de pagina",
      pdfExtract: "Guarda imagenes incrustadas",
      pdfImage: "Exporta paginas como JPG o PNG",
      pdfText: "Extrae texto seleccionable",
      removePassword: "Usa una contrasena conocida",
      signature: "Dibuja o escribe una firma",
      split: "Extrae paginas o separa todo",
      spreadsheet: "Convierte tablas XLSX o CSV",
      text: "Convierte TXT a PDF",
      watermark: "Agrega sellos de texto",
      word: "Convierte texto DOCX a PDF"
    },
    hi: {
      addText: "Forms और labels भरें",
      annotate: "Highlight, draw और mark करें",
      compress: "File size कम करें",
      crop: "Margins और page area trim करें",
      flatten: "Visible page appearance lock करें",
      image: "JPG या PNG को PDF बनाएं",
      merge: "कई PDF files combine करें",
      metadata: "Title और document info edit करें",
      pageNumbers: "PDF में page labels जोड़ें",
      pdfExtract: "Embedded images save करें",
      pdfImage: "Pages को JPG या PNG बनाएं",
      pdfText: "Selectable text निकालें",
      removePassword: "Known password use करें",
      signature: "Signature draw या type करें",
      split: "Pages extract या split करें",
      spreadsheet: "XLSX या CSV tables convert करें",
      text: "Text files को PDF बनाएं",
      watermark: "Pages में text stamp जोड़ें",
      word: "DOCX text को PDF बनाएं"
    },
    id: {
      addText: "Isi form dan label datar",
      annotate: "Sorot, gambar, dan tandai",
      compress: "Coba kurangi ukuran file",
      crop: "Pangkas margin dan area halaman",
      flatten: "Kunci tampilan halaman",
      image: "Ubah JPG atau PNG ke PDF",
      merge: "Gabungkan beberapa PDF",
      metadata: "Edit judul dan info dokumen",
      pageNumbers: "Tambahkan label halaman",
      pdfExtract: "Simpan gambar tertanam",
      pdfImage: "Ekspor halaman ke JPG atau PNG",
      pdfText: "Ekstrak teks yang bisa dipilih",
      removePassword: "Gunakan kata sandi yang diketahui",
      signature: "Gambar atau ketik tanda tangan",
      split: "Ekstrak halaman atau pisahkan semua",
      spreadsheet: "Ubah tabel XLSX atau CSV",
      text: "Ubah file teks ke PDF",
      watermark: "Tambahkan stempel teks",
      word: "Ubah teks DOCX ke PDF"
    },
    ja: {
      addText: "フォームやラベルに入力",
      annotate: "ハイライトや描画を追加",
      compress: "ファイルサイズを小さく",
      crop: "余白とページ範囲を調整",
      flatten: "表示状態を固定",
      image: "JPG/PNGをPDFへ変換",
      merge: "複数PDFを結合",
      metadata: "タイトルと文書情報を編集",
      pageNumbers: "PDFにページ番号を追加",
      pdfExtract: "埋め込み画像を保存",
      pdfImage: "ページをJPG/PNGで書き出し",
      pdfText: "選択可能なテキストを抽出",
      removePassword: "既知のパスワードを使用",
      signature: "署名を描く、または入力",
      split: "ページ抽出または全分割",
      spreadsheet: "XLSX/CSV表を変換",
      text: "テキストファイルをPDFへ",
      watermark: "ページに文字スタンプを追加",
      word: "DOCXテキストをPDFへ"
    },
    ko: {
      addText: "양식과 라벨에 입력",
      annotate: "하이라이트, 그리기, 표시",
      compress: "파일 크기 줄이기",
      crop: "여백과 페이지 영역 자르기",
      flatten: "보이는 페이지 모양 고정",
      image: "JPG/PNG를 PDF로 변환",
      merge: "여러 PDF 결합",
      metadata: "제목과 문서 정보 편집",
      pageNumbers: "PDF에 페이지 번호 추가",
      pdfExtract: "포함된 이미지 저장",
      pdfImage: "페이지를 JPG/PNG로 내보내기",
      pdfText: "선택 가능한 텍스트 추출",
      removePassword: "알고 있는 비밀번호 사용",
      signature: "서명을 그리거나 입력",
      split: "페이지 추출 또는 전체 분할",
      spreadsheet: "XLSX/CSV 표 변환",
      text: "텍스트 파일을 PDF로",
      watermark: "페이지에 텍스트 스탬프 추가",
      word: "DOCX 텍스트를 PDF로"
    },
    tl: {
      addText: "Punan ang forms at labels",
      annotate: "Highlight, draw, at mark up",
      compress: "Subukang bawasan ang file size",
      crop: "I-trim ang margins at page area",
      flatten: "I-lock ang visible appearance",
      image: "Gawing PDF ang JPG o PNG",
      merge: "Pagsamahin ang maraming PDF",
      metadata: "I-edit ang title at info",
      pageNumbers: "Magdagdag ng page labels",
      pdfExtract: "I-save ang embedded images",
      pdfImage: "I-export pages bilang JPG o PNG",
      pdfText: "Kunin ang selectable text",
      removePassword: "Gamitin ang alam na password",
      signature: "Gumuhit o mag-type ng pirma",
      split: "Kunin o hatiin ang pages",
      spreadsheet: "I-convert ang XLSX o CSV",
      text: "Gawing PDF ang text files",
      watermark: "Magdagdag ng text stamps",
      word: "Gawing PDF ang DOCX text"
    },
    zh: {
      addText: "填写表单和标签",
      annotate: "高亮、绘图和标记",
      compress: "尝试减小文件大小",
      crop: "裁剪边距和页面区域",
      flatten: "锁定可见页面外观",
      image: "将 JPG/PNG 转为 PDF",
      merge: "合并多个 PDF",
      metadata: "编辑标题和文档信息",
      pageNumbers: "为 PDF 添加页码",
      pdfExtract: "保存内嵌图片",
      pdfImage: "页面导出为 JPG/PNG",
      pdfText: "提取可选择文本",
      removePassword: "使用已知密码",
      signature: "绘制或输入签名",
      split: "提取页面或全部拆分",
      spreadsheet: "转换 XLSX 或 CSV 表格",
      text: "文本文件转 PDF",
      watermark: "添加文字印章",
      word: "DOCX 文本转 PDF"
    }
  };

  const toolIconMarkup = {
    addText: '<path class="icon-fill" d="M14 8h18v8H14z"/><path d="M16 34V14m-7 0h14m15 22v-9m-5 4.5h10M30 41h18M30 31h10"/>',
    annotate: '<path class="icon-fill" d="M13 35l6 6 23-23-6-6z"/><path d="M13 35l-3 11 11-3 24-24a5 5 0 0 0 0-7l-3-3a5 5 0 0 0-7 0zM34 12l10 10M15 35l6 6M28 44h20"/>',
    compress: '<path class="icon-fill" d="M16 8h24l8 8v32H16z"/><path d="M16 8h24l8 8v32H16zM40 8v8h8M24 22h16M24 34h16M10 28h13m-7-7 7 7-7 7m38-7H41m7-7-7 7 7 7"/>',
    crop: '<path class="icon-fill" d="M18 18h26v26H18z"/><path d="M14 6v34a8 8 0 0 0 8 8h34M6 14h34a8 8 0 0 1 8 8v34M22 18h22v22"/>',
    flatten: '<path class="icon-fill" d="M8 20l20-10 20 10-20 10z"/><path d="M8 20l20-10 20 10-20 10zM12 30l16 8 16-8M12 40l16 8 16-8"/>',
    image: '<path class="icon-fill" d="M10 12h36v32H10z"/><path d="M10 12h36v32H10zM16 38l10-12 7 8 5-6 8 10M34 21h.1"/>',
    merge: '<path class="icon-fill" d="M10 11h22v28H10z"/><path d="M10 11h22v28H10zM22 17h22v28H22zM18 25h18m-7-7 7 7-7 7"/>',
    metadata: '<path class="icon-fill" d="M10 10h28l8 8v30H10z"/><path d="M10 10h28l8 8v30H10zM38 10v8h8M18 22h14M18 31h20M18 40h14M40 34l4 4 8-10"/>',
    pageNumbers: '<path class="icon-fill" d="M14 8h28l8 8v36H14z"/><path d="M14 8h28l8 8v36H14zM42 8v8h8M20 25h24M20 36h24M22 45h5m6 0h5"/>',
    pdfExtract: '<path class="icon-fill" d="M10 14h27v24H10z"/><path d="M10 14h27v24H10zM16 33l7-8 5 6 3-4 6 6M34 11h10v30H34M44 26h10m-7-7 7 7-7 7"/>',
    pdfImage: '<path class="icon-fill" d="M9 10h24v32H9z"/><path d="M9 10h24v32H9zM15 34l6-8 5 6 3-4 4 6M38 16h10v28H26M37 30h13m-7-7 7 7-7 7"/>',
    pdfText: '<path class="icon-fill" d="M12 8h28l8 8v36H12z"/><path d="M12 8h28l8 8v36H12zM40 8v8h8M20 25h20M20 34h20M20 43h12M44 35h10m-7-7 7 7-7 7"/>',
    removePassword: '<path class="icon-fill" d="M15 24h34v24H15z"/><path d="M15 24h34v24H15zM24 24v-6a10 10 0 0 1 19-4M32 33v8M32 33h.1"/>',
    signature: '<path class="icon-fill" d="M34 8l12 12-23 23H11V31z"/><path d="M34 8l12 12-23 23H11V31zM30 12l12 12M10 49c7-5 12-5 17 0 5 4 10 4 17-1"/>',
    split: '<path class="icon-fill" d="M11 10h34v36H11z"/><path d="M11 10h34v36H11zM28 12v32M17 22h9M17 34h9M34 22h5M34 34h5M25 28l-12 12M13 28l12 12"/>',
    spreadsheet: '<path class="icon-fill" d="M10 12h38v34H10z"/><path d="M10 12h38v34H10zM10 22h38M10 32h38M22 12v34M35 12v34"/>',
    text: '<path class="icon-fill" d="M14 8h28l8 8v36H14z"/><path d="M14 8h28l8 8v36H14zM42 8v8h8M21 24h22M21 33h22M21 42h14"/>',
    watermark: '<path class="icon-fill" d="M28 8c8 10 16 19 16 30a16 16 0 0 1-32 0c0-11 8-20 16-30z"/><path d="M28 8c8 10 16 19 16 30a16 16 0 0 1-32 0c0-11 8-20 16-30zM20 34l5 9 6-15 5 15 4-9"/>',
    word: '<path class="icon-fill" d="M13 8h28l8 8v36H13z"/><path d="M13 8h28l8 8v36H13zM41 8v8h8M19 25l5 18 5-13 5 13 5-18"/>'
  };

  const menuBadgeLabels = {
    en: {
      New: "New",
      Popular: "Popular"
    },
    es: {
      New: "Nuevo",
      Popular: "Popular"
    },
    hi: {
      New: "New",
      Popular: "Popular"
    },
    id: {
      New: "Baru",
      Popular: "Populer"
    },
    ja: {
      New: "新着",
      Popular: "人気"
    },
    zh: {
      New: "新功能",
      Popular: "热门"
    },
    ko: {
      New: "신규",
      Popular: "인기"
    },
    tl: {
      New: "Bago",
      Popular: "Popular"
    }
  };

  const toolSearchAliases = {
    addText: "fill form forms type write textbox input label",
    annotate: "comment comments highlight markup draw note notes shapes",
    compress: "small smaller reduce shrink optimize size lightweight",
    crop: "trim cut margins resize page area",
    flatten: "lock burn in make permanent rasterize secure appearance",
    image: "jpg jpeg png photo picture scan images convert",
    merge: "combine join append concatenate together multiple",
    metadata: "properties title author keywords subject document info",
    pageNumbers: "number numbering footer header labels pagination",
    pdfExtract: "extract pictures photos logos embedded xobject assets",
    pdfImage: "jpg jpeg png export convert image photo page",
    pdfText: "txt copy text selectable extract OCR words content",
    removePassword: "unlock decrypt password protected encrypted open security",
    signature: "sign signer signature approve initials draw type",
    split: "extract separate page pages range first last every zip",
    spreadsheet: "excel xlsx csv sheet table workbook office",
    text: "txt plain notes document",
    watermark: "stamp confidential draft mark overlay",
    word: "doc docx office document word processor"
  };

  const pageToolMap = {
    "add-text-to-pdf/": "addText",
    "annotate-pdf/": "annotate",
    "compress-pdf/": "compress",
    "crop-pdf/": "crop",
    "edit-pdf-metadata/": "metadata",
    "extract-images-from-pdf/": "pdfExtract",
    "extract-text-from-pdf/": "pdfText",
    "flatten-pdf/": "flatten",
    "image-to-pdf/": "image",
    "merge-pdf/": "merge",
    "page-numbers-pdf/": "pageNumbers",
    "pdf-to-jpg/": "pdfImage",
    "remove-pdf-password/": "removePassword",
    "sign-pdf/": "signature",
    "split-pdf/": "split",
    "watermark-pdf/": "watermark",
    "word-to-pdf/": "word"
  };

  const languageData = {
    en: {
      code: "en",
      categories: {
        all: "All",
        edit: "Edit PDF",
        "from-pdf": "Convert from PDF",
        "to-pdf": "Convert to PDF"
      },
      common: {
        clear: "Clear",
        clearDrawing: "Clear drawing",
        clearFile: "Clear file",
        clearFiles: "Clear files",
        clearSignature: "Clear signature",
        dark: "Dark",
        fullViewSigner: "Full-view signer",
        howToUse: "How to use",
        install: "Install app",
        light: "Light",
        switchToDark: "Switch to dark mode",
        switchToLight: "Switch to light mode"
      },
      faq: [
        ["Can I use this without internet?", "Yes. The PDF and file-reading libraries are included locally in the project, so the tool can run offline after the files are on your device."],
        ["Why should I check the file order?", "Merge and image conversion keep the selected order. Use the drag handles or arrow buttons to adjust the list before creating a PDF."],
        ["What page range format works?", "Use individual pages, ranges, or both, such as 1, 3-5, 8. Pages are extracted in the order entered."],
        ["Can it open password-protected PDFs?", "PDFNest can ask for a password for page previews, PDF-to-image export, image extraction, text extraction, and password removal. Most direct editing tools still need an unlocked PDF."],
        ["Can I remove a PDF password?", "Yes, if you already know the password. The output is rebuilt visually, so selectable text may not be preserved."],
        ["Can it convert Word, PowerPoint, OCR, or PDF back to Office files?", "Advanced PowerPoint, OCR, and PDF-to-Office conversions need larger document engines or OCR models to be reliable."]
      ],
      footer: {
        about: "About",
        contact: "Contact",
        message: "All processing runs locally in your browser. Refreshing the page clears selected files and generated links.",
        privacy: "Privacy Policy",
        sitemap: "Sitemap"
      },
      header: {
        allTools: "All Tools",
        eyebrow: "Private document tools",
        freeTools: "Free tools",
        intro: "Fast PDF tools that run in your browser, with files kept on your device.",
        noUpload: "No upload server",
        offline: "Works offline"
      },
      home: {
        eyebrow: "Browser-only PDF tools",
        title: "PDF tools. Fast. Simple. Private.",
        intro: "Merge, split, compress, convert, sign, and extract files locally in your browser.",
        uploadTitle: "Drop PDF or image files here",
        uploadCopy: "Choose files to start with Merge PDF or Image to PDF.",
        uploadButton: "Choose Files",
        uploadPrivacy: "Files stay in your browser. No upload server.",
        quickEyebrow: "Start fast",
        quickTitle: "Quick Tools",
        viewAll: "View All Tools",
        proof: [
          ["Private by design", "Selected files stay on your device."],
          ["Offline ready", "Cached tools can run without internet."],
          ["No sign up", "Use the tools without accounts."],
          ["Browser based", "Works on modern desktop and mobile browsers."]
        ]
      },
      history: {
        clear: "Clear",
        file: "file",
        files: "files",
        latest: "Latest downloads from this session.",
        moreHidden: "{count} older downloads hidden. Clear history to remove them.",
        noDownloads: "No downloads yet.",
        noFiles: "No files",
        title: "History"
      },
      instructions: {
        items: [
          "Open All Tools and choose the tool you need.",
          "Upload the files for the task you want to run.",
          "Check the selected order before merging or converting.",
          "Click the matching action button.",
          "Use the generated download link for the finished file."
        ],
        title: "Instructions"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "How Privacy Works",
        intro: "PDFNest handles common PDF tasks like merge, split, sign, watermark, page numbers, image conversion, text extraction, and known-password PDF unlocking without an upload server.",
        popular: "Popular Tools",
        privacy: "Privacy",
        privacyBody: "Files are processed locally in your browser. Generated download links are temporary and are cleared when the page is refreshed or closed.",
        privacyLink: "Read the Privacy Policy",
        privacyWorks: "Browser JavaScript reads the selected files on your device, runs the chosen tool, and creates a local download link for the result.",
        title: "Work with documents in your browser",
        tools: "Private PDF tools"
      },
      toolsPanel: {
        choose: "Choose a PDF tool",
        close: "Close tools menu",
        kicker: "Tool menu",
        noMatches: "No matching tools.",
        search: "Search tools"
      },
      activeNote: "Showing {tool} in {category}. Use All Tools to switch.",
      toolDrops: {
        addText: "Select one PDF",
        annotate: "Select one PDF",
        compress: "Select one PDF",
        crop: "Select one PDF",
        flatten: "Select one PDF",
        image: "Select images",
        merge: "Select PDF files",
        metadata: "Select one PDF",
        pageNumbers: "Select one PDF",
        pdfExtract: "Select a PDF",
        pdfImage: "Select a PDF",
        pdfText: "Select a PDF",
        removePassword: "Select a protected PDF",
        signature: "Select one PDF",
        split: "Select one PDF",
        spreadsheet: "Select spreadsheets",
        text: "Select text files",
        watermark: "Select one PDF",
        word: "Select Word files"
      },
      toolLabels: {
        addText: "Add Text",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Image to PDF",
        merge: "Merge PDFs",
        metadata: "Edit Metadata",
        pageNumbers: "Page Numbers",
        pdfExtract: "Extract Images",
        pdfImage: "PDF to Images",
        pdfText: "PDF to TXT",
        removePassword: "Remove Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolHeadings: {
        addText: "Add Text / Fill PDF",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Image to PDF",
        merge: "Merge PDFs",
        metadata: "Edit PDF Metadata",
        pageNumbers: "Page Numbers PDF",
        pdfExtract: "Extract Images from PDF",
        pdfImage: "PDF to PNG/JPG",
        pdfText: "PDF to TXT",
        removePassword: "Remove PDF Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolActions: {
        addText: "Add Text",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Convert Images",
        merge: "Merge PDFs",
        metadata: "Update Metadata",
        pageNumbers: "Add Page Numbers",
        pdfExtract: "Extract Images",
        pdfImage: "Export Images",
        pdfText: "Extract Text",
        removePassword: "Remove Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Convert Spreadsheet",
        text: "Convert Text",
        watermark: "Add Watermark",
        word: "Convert Word"
      }
    },
    ja: {
      code: "ja",
      categories: { all: "すべて", edit: "PDF編集", "from-pdf": "PDFから変換", "to-pdf": "PDFへ変換" },
      common: {
        clear: "クリア",
        clearDrawing: "描画をクリア",
        clearFile: "ファイルをクリア",
        clearFiles: "ファイルをクリア",
        clearSignature: "署名をクリア",
        dark: "ダーク",
        fullViewSigner: "全画面署名",
        howToUse: "使い方",
        install: "アプリをインストール",
        light: "ライト",
        switchToDark: "ダークモードに切り替え",
        switchToLight: "ライトモードに切り替え"
      },
      faq: [
        ["インターネットなしで使えますか？", "はい。PDFとファイル読み取りのライブラリはローカルに含まれているため、ブラウザにキャッシュされた後はオフラインでも動作できます。"],
        ["ファイルの順番を確認する必要があるのはなぜですか？", "結合と画像変換では選択した順番が保たれます。PDFを作成する前に並び替えを確認してください。"],
        ["ページ範囲はどの形式で入力できますか？", "1, 3-5, 8 のように、単一ページ、範囲、またはその両方を入力できます。"],
        ["パスワード付きPDFを開けますか？", "PDFNestはプレビュー、エクスポート、画像/テキスト抽出、パスワード削除でパスワード入力を求めることができます。多くの編集ツールでは解除済みPDFが必要です。"],
        ["PDFのパスワードを削除できますか？", "はい、すでにパスワードを知っている場合のみ可能です。出力は見た目を再構築するため、選択可能なテキストは保持されない場合があります。"],
        ["Word、PowerPoint、OCR、PDFからOfficeへの変換はできますか？", "これらの高度な変換を安定して行うには、より大きな変換エンジンやバックエンドが必要です。"]
      ],
      footer: {
        about: "概要",
        contact: "お問い合わせ",
        message: "すべての処理はブラウザ内でローカルに実行されます。ページを更新すると、選択ファイルと生成リンクは消えます。",
        privacy: "プライバシーポリシー",
        sitemap: "サイトマップ"
      },
      header: {
        allTools: "すべてのツール",
        eyebrow: "プライベート文書ツール",
        freeTools: "無料ツール",
        intro: "ファイルを端末内に保ったまま、ブラウザで動く高速PDFツールです。",
        noUpload: "アップロードサーバーなし",
        offline: "オフライン対応"
      },
      home: {
        eyebrow: "ブラウザだけで使えるPDFツール",
        title: "PDF tools. 高速. シンプル. プライベート.",
        intro: "PDFの結合、分割、圧縮、変換、署名、抽出をブラウザ内でローカルに実行します。",
        uploadTitle: "PDFまたは画像をここにドロップ",
        uploadCopy: "ファイルを選ぶと、PDF結合または画像からPDFを開始できます。",
        uploadButton: "ファイルを選択",
        uploadPrivacy: "ファイルはブラウザ内に残ります。アップロードサーバーはありません。",
        quickEyebrow: "すぐに開始",
        quickTitle: "クイックツール",
        viewAll: "すべて表示",
        proof: [
          ["プライバシー重視", "選択したファイルは端末内に残ります。"],
          ["オフライン対応", "キャッシュ済みツールはインターネットなしで動作できます。"],
          ["登録不要", "アカウントなしでツールを使えます。"],
          ["ブラウザベース", "最新のデスクトップ/モバイルブラウザで動作します。"]
        ]
      },
      history: {
        clear: "クリア",
        file: "ファイル",
        files: "ファイル",
        latest: "このセッションの最新ダウンロードです。",
        moreHidden: "{count} 件の古いダウンロードを非表示にしています。削除するには履歴をクリアしてください。",
        noDownloads: "ダウンロードはまだありません。",
        noFiles: "ファイルなし",
        title: "履歴"
      },
      instructions: {
        items: [
          "すべてのツールを開き、必要なツールを選びます。",
          "処理したいファイルをアップロードします。",
          "結合または変換の前に順番を確認します。",
          "該当する実行ボタンをクリックします。",
          "生成されたダウンロードリンクから結果を保存します。"
        ],
        title: "手順"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "プライバシーの仕組み",
        intro: "PDFNestは、アップロードサーバーなしで、結合、分割、署名、透かし、ページ番号、画像変換、テキスト抽出、既知パスワードPDFの解除などを処理します。",
        popular: "人気ツール",
        privacy: "プライバシー",
        privacyBody: "ファイルはブラウザ内でローカル処理されます。生成されたダウンロードリンクは一時的で、ページを更新または閉じると消えます。",
        privacyLink: "プライバシーポリシーを読む",
        privacyWorks: "ブラウザのJavaScriptが端末上の選択ファイルを読み取り、選択したツールを実行し、ローカルのダウンロードリンクを作成します。",
        title: "ブラウザで文書を処理",
        tools: "プライベートPDFツール"
      },
      toolsPanel: {
        choose: "PDFツールを選択",
        close: "ツールメニューを閉じる",
        kicker: "ツールメニュー",
        noMatches: "一致するツールはありません。",
        search: "ツールを検索"
      },
      activeNote: "{category} の {tool} を表示中です。切り替えるにはすべてのツールを使ってください。",
      toolDrops: {
        addText: "PDFを1つ選択",
        annotate: "PDFを1つ選択",
        compress: "PDFを1つ選択",
        crop: "PDFを1つ選択",
        flatten: "PDFを1つ選択",
        image: "画像を選択",
        merge: "PDFファイルを選択",
        metadata: "PDFを1つ選択",
        pageNumbers: "PDFを1つ選択",
        pdfExtract: "PDFを1つ選択",
        pdfImage: "PDFを1つ選択",
        pdfText: "PDFを1つ選択",
        removePassword: "保護されたPDFを選択",
        signature: "PDFを1つ選択",
        split: "PDFを1つ選択",
        spreadsheet: "スプレッドシートを選択",
        text: "TXTファイルを選択",
        watermark: "PDFを1つ選択",
        word: "DOCXファイルを選択"
      },
      toolLabels: {
        addText: "テキスト追加",
        annotate: "PDF注釈",
        compress: "PDF圧縮",
        crop: "PDF切り抜き",
        flatten: "PDFフラット化",
        image: "画像からPDF",
        merge: "PDF結合",
        metadata: "メタデータ編集",
        pageNumbers: "ページ番号",
        pdfExtract: "画像抽出",
        pdfImage: "PDFを画像に",
        pdfText: "PDFをTXTに",
        removePassword: "パスワード削除",
        signature: "PDF署名",
        split: "PDF分割",
        spreadsheet: "表計算からPDF",
        text: "TXTからPDF",
        watermark: "PDF透かし",
        word: "WordからPDF"
      },
      toolHeadings: {
        addText: "PDFにテキスト追加",
        annotate: "PDF注釈",
        compress: "PDF圧縮",
        crop: "PDF切り抜き",
        flatten: "PDFをフラット化",
        image: "画像からPDF",
        merge: "PDF結合",
        metadata: "メタデータ編集",
        pageNumbers: "ページ番号",
        pdfExtract: "PDFから画像抽出",
        pdfImage: "PDFをPNG/JPGに変換",
        pdfText: "PDFをTXTに変換",
        removePassword: "PDFパスワード削除",
        signature: "PDF署名",
        split: "PDF分割",
        spreadsheet: "スプレッドシートからPDF",
        text: "TXTからPDF",
        watermark: "PDF透かし",
        word: "WordからPDF"
      },
      toolActions: {
        addText: "テキストを追加",
        annotate: "PDFに注釈",
        compress: "PDFを圧縮",
        crop: "PDFを切り抜き",
        flatten: "PDFをフラット化",
        image: "画像を変換",
        merge: "PDFを結合",
        metadata: "メタデータ更新",
        pageNumbers: "ページ番号を追加",
        pdfExtract: "画像を抽出",
        pdfImage: "画像を書き出し",
        pdfText: "テキストを抽出",
        removePassword: "パスワード削除",
        signature: "PDFに署名",
        split: "PDFを分割",
        spreadsheet: "表を変換",
        text: "テキストを変換",
        watermark: "透かしを追加",
        word: "Wordを変換"
      }
    },
    zh: {
      code: "zh",
      categories: { all: "全部", edit: "编辑 PDF", "from-pdf": "从 PDF 转换", "to-pdf": "转换为 PDF" },
      common: {
        clear: "清除",
        clearDrawing: "清除绘图",
        clearFile: "清除文件",
        clearFiles: "清除文件",
        clearSignature: "清除签名",
        dark: "深色",
        fullViewSigner: "全屏签名",
        howToUse: "使用方法",
        install: "安装应用",
        light: "浅色",
        switchToDark: "切换到深色模式",
        switchToLight: "切换到浅色模式"
      },
      faq: [
        ["没有网络也能使用吗？", "可以。PDF 和文件读取库已包含在本地，资源缓存到浏览器后可以离线运行。"],
        ["为什么要检查文件顺序？", "合并和图片转换会保留选择顺序。创建 PDF 前请调整列表顺序。"],
        ["页面范围支持什么格式？", "可以输入单页、范围或两者组合，例如 1, 3-5, 8。"],
        ["可以打开带密码的 PDF 吗？", "PDFNest 可在预览、导出、图片/文本提取和移除密码时请求密码。多数编辑工具仍需要已解锁的 PDF。"],
        ["可以移除 PDF 密码吗？", "可以，但仅限你已经知道密码的 PDF。输出会以可见页面方式重建，因此可能无法保留可选中文本。"],
        ["支持 Word、PowerPoint、OCR 或 PDF 转 Office 吗？", "这些高级转换需要更大的文档引擎或后端服务才能可靠运行。"]
      ],
      footer: {
        about: "关于",
        contact: "联系",
        message: "所有处理都在浏览器本地运行。刷新页面会清除已选文件和生成的链接。",
        privacy: "隐私政策",
        sitemap: "站点地图"
      },
      header: {
        allTools: "全部工具",
        eyebrow: "私密文档工具",
        freeTools: "免费工具",
        intro: "快速 PDF 工具在浏览器中运行，文件保留在你的设备上。",
        noUpload: "无上传服务器",
        offline: "支持离线"
      },
      home: {
        eyebrow: "仅用浏览器的 PDF 工具",
        title: "PDF tools. 快速. 简单. 私密.",
        intro: "在浏览器本地合并、拆分、压缩、转换、签名和提取文件。",
        uploadTitle: "将 PDF 或图片拖到这里",
        uploadCopy: "选择文件即可开始合并 PDF 或图片转 PDF。",
        uploadButton: "选择文件",
        uploadPrivacy: "文件保留在浏览器中。没有上传服务器。",
        quickEyebrow: "快速开始",
        quickTitle: "快捷工具",
        viewAll: "查看全部",
        proof: [
          ["隐私优先", "所选文件保留在你的设备上。"],
          ["离线可用", "缓存后的工具可在无网络时运行。"],
          ["无需注册", "无需账号即可使用工具。"],
          ["基于浏览器", "适用于现代桌面和移动浏览器。"]
        ]
      },
      history: {
        clear: "清除",
        file: "个文件",
        files: "个文件",
        latest: "本次会话的最新下载。",
        moreHidden: "已隐藏 {count} 个较早下载。清除历史可移除它们。",
        noDownloads: "还没有下载。",
        noFiles: "没有文件",
        title: "历史"
      },
      instructions: {
        items: [
          "打开全部工具并选择需要的工具。",
          "上传要处理的文件。",
          "合并或转换前检查文件顺序。",
          "点击对应的操作按钮。",
          "使用生成的下载链接保存结果。"
        ],
        title: "说明"
      },
      seo: {
        faq: "常见问题",
        howPrivacy: "隐私如何运作",
        intro: "PDFNest 可在没有上传服务器的情况下处理合并、拆分、签名、加水印、页码、图片转换、文本提取和已知密码 PDF 解锁等任务。",
        popular: "热门工具",
        privacy: "隐私",
        privacyBody: "文件会在浏览器中本地处理。生成的下载链接是临时的，刷新或关闭页面后会清除。",
        privacyLink: "阅读隐私政策",
        privacyWorks: "浏览器 JavaScript 会读取设备上选择的文件，运行所选工具，并创建本地下载链接。",
        title: "在浏览器中处理文档",
        tools: "私密 PDF 工具"
      },
      toolsPanel: {
        choose: "选择 PDF 工具",
        close: "关闭工具菜单",
        kicker: "工具菜单",
        noMatches: "没有匹配的工具。",
        search: "搜索工具"
      },
      activeNote: "正在显示 {category} 中的 {tool}。使用全部工具切换。",
      toolDrops: {
        addText: "选择一个 PDF",
        annotate: "选择一个 PDF",
        compress: "选择一个 PDF",
        crop: "选择一个 PDF",
        flatten: "选择一个 PDF",
        image: "选择图片",
        merge: "选择 PDF 文件",
        metadata: "选择一个 PDF",
        pageNumbers: "选择一个 PDF",
        pdfExtract: "选择一个 PDF",
        pdfImage: "选择一个 PDF",
        pdfText: "选择一个 PDF",
        removePassword: "选择受保护的 PDF",
        signature: "选择一个 PDF",
        split: "选择一个 PDF",
        spreadsheet: "选择表格文件",
        text: "选择 TXT 文件",
        watermark: "选择一个 PDF",
        word: "选择 DOCX 文件"
      },
      toolLabels: {
        addText: "添加文本",
        annotate: "PDF 注释",
        compress: "压缩 PDF",
        crop: "裁剪 PDF",
        flatten: "扁平化 PDF",
        image: "图片转 PDF",
        merge: "合并 PDF",
        metadata: "编辑元数据",
        pageNumbers: "页码",
        pdfExtract: "提取图片",
        pdfImage: "PDF 转图片",
        pdfText: "PDF 转 TXT",
        removePassword: "移除密码",
        signature: "签署 PDF",
        split: "拆分 PDF",
        spreadsheet: "表格转 PDF",
        text: "TXT 转 PDF",
        watermark: "PDF 水印",
        word: "Word 转 PDF"
      },
      toolHeadings: {
        addText: "添加文本到 PDF",
        annotate: "PDF 注释",
        compress: "压缩 PDF",
        crop: "裁剪 PDF",
        flatten: "扁平化 PDF",
        image: "图片转 PDF",
        merge: "合并 PDF",
        metadata: "编辑元数据",
        pageNumbers: "页码",
        pdfExtract: "从 PDF 提取图片",
        pdfImage: "PDF 转 PNG/JPG",
        pdfText: "PDF 转 TXT",
        removePassword: "移除 PDF 密码",
        signature: "签署 PDF",
        split: "拆分 PDF",
        spreadsheet: "表格转 PDF",
        text: "TXT 转 PDF",
        watermark: "PDF 水印",
        word: "Word 转 PDF"
      },
      toolActions: {
        addText: "添加文本",
        annotate: "注释 PDF",
        compress: "压缩 PDF",
        crop: "裁剪 PDF",
        flatten: "扁平化 PDF",
        image: "转换图片",
        merge: "合并 PDF",
        metadata: "更新元数据",
        pageNumbers: "添加页码",
        pdfExtract: "提取图片",
        pdfImage: "导出图片",
        pdfText: "提取文本",
        removePassword: "移除密码",
        signature: "签署 PDF",
        split: "拆分 PDF",
        spreadsheet: "转换表格",
        text: "转换文本",
        watermark: "添加水印",
        word: "转换 Word"
      }
    },
    ko: {
      code: "ko",
      categories: { all: "전체", edit: "PDF 편집", "from-pdf": "PDF에서 변환", "to-pdf": "PDF로 변환" },
      common: {
        clear: "지우기",
        clearDrawing: "그림 지우기",
        clearFile: "파일 지우기",
        clearFiles: "파일 지우기",
        clearSignature: "서명 지우기",
        dark: "다크",
        fullViewSigner: "전체 화면 서명",
        howToUse: "사용 방법",
        install: "앱 설치",
        light: "라이트",
        switchToDark: "다크 모드로 전환",
        switchToLight: "라이트 모드로 전환"
      },
      faq: [
        ["인터넷 없이 사용할 수 있나요?", "네. PDF와 파일 읽기 라이브러리가 로컬에 포함되어 있어 브라우저에 캐시된 후에는 오프라인에서도 실행할 수 있습니다."],
        ["파일 순서를 확인해야 하는 이유는 무엇인가요?", "병합과 이미지 변환은 선택한 순서를 유지합니다. PDF를 만들기 전에 목록 순서를 확인하세요."],
        ["페이지 범위는 어떤 형식으로 입력하나요?", "1, 3-5, 8처럼 단일 페이지, 범위 또는 둘 다 입력할 수 있습니다."],
        ["비밀번호가 있는 PDF를 열 수 있나요?", "PDFNest는 미리보기, 내보내기, 이미지/텍스트 추출, 비밀번호 제거에서 비밀번호를 요청할 수 있습니다. 대부분의 편집 도구는 잠금 해제된 PDF가 필요합니다."],
        ["PDF 비밀번호를 제거할 수 있나요?", "네, 이미 비밀번호를 알고 있는 PDF에 한해 가능합니다. 출력은 보이는 페이지를 다시 만들기 때문에 선택 가능한 텍스트가 유지되지 않을 수 있습니다."],
        ["Word, PowerPoint, OCR 또는 PDF를 Office로 변환할 수 있나요?", "이러한 고급 변환은 안정적인 처리를 위해 더 큰 문서 엔진이나 백엔드가 필요합니다."]
      ],
      footer: {
        about: "소개",
        contact: "문의",
        message: "모든 처리는 브라우저에서 로컬로 실행됩니다. 페이지를 새로고침하면 선택한 파일과 생성된 링크가 지워집니다.",
        privacy: "개인정보 처리방침",
        sitemap: "사이트맵"
      },
      header: {
        allTools: "전체 도구",
        eyebrow: "개인 문서 도구",
        freeTools: "무료 도구",
        intro: "파일을 기기에 보관한 채 브라우저에서 실행되는 빠른 PDF 도구입니다.",
        noUpload: "업로드 서버 없음",
        offline: "오프라인 지원"
      },
      home: {
        eyebrow: "브라우저 전용 PDF 도구",
        title: "PDF tools. 빠름. 간단함. 비공개.",
        intro: "브라우저에서 로컬로 PDF 병합, 분할, 압축, 변환, 서명, 추출을 실행합니다.",
        uploadTitle: "PDF 또는 이미지를 여기에 놓기",
        uploadCopy: "파일을 선택하면 PDF 병합 또는 이미지 PDF 변환을 시작합니다.",
        uploadButton: "파일 선택",
        uploadPrivacy: "파일은 브라우저에 남아 있습니다. 업로드 서버가 없습니다.",
        quickEyebrow: "빠르게 시작",
        quickTitle: "빠른 도구",
        viewAll: "전체 보기",
        proof: [
          ["개인정보 중심", "선택한 파일은 기기에 남아 있습니다."],
          ["오프라인 준비", "캐시된 도구는 인터넷 없이 실행할 수 있습니다."],
          ["가입 불필요", "계정 없이 도구를 사용할 수 있습니다."],
          ["브라우저 기반", "최신 데스크톱 및 모바일 브라우저에서 작동합니다."]
        ]
      },
      history: {
        clear: "지우기",
        file: "개 파일",
        files: "개 파일",
        latest: "이 세션의 최신 다운로드입니다.",
        moreHidden: "이전 다운로드 {count}개가 숨겨져 있습니다. 제거하려면 기록을 지우세요.",
        noDownloads: "아직 다운로드가 없습니다.",
        noFiles: "파일 없음",
        title: "기록"
      },
      instructions: {
        items: [
          "전체 도구를 열고 필요한 도구를 선택합니다.",
          "작업할 파일을 업로드합니다.",
          "병합 또는 변환 전 순서를 확인합니다.",
          "해당 실행 버튼을 클릭합니다.",
          "생성된 다운로드 링크로 결과를 저장합니다."
        ],
        title: "안내"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "개인정보 보호 방식",
        intro: "PDFNest는 업로드 서버 없이 병합, 분할, 서명, 워터마크, 페이지 번호, 이미지 변환, 텍스트 추출, 알려진 비밀번호 PDF 잠금 해제를 처리합니다.",
        popular: "인기 도구",
        privacy: "개인정보",
        privacyBody: "파일은 브라우저에서 로컬로 처리됩니다. 생성된 다운로드 링크는 임시이며 페이지를 새로고침하거나 닫으면 지워집니다.",
        privacyLink: "개인정보 처리방침 읽기",
        privacyWorks: "브라우저 JavaScript가 기기에서 선택한 파일을 읽고, 선택한 도구를 실행하며, 로컬 다운로드 링크를 만듭니다.",
        title: "브라우저에서 문서 작업",
        tools: "개인 PDF 도구"
      },
      toolsPanel: {
        choose: "PDF 도구 선택",
        close: "도구 메뉴 닫기",
        kicker: "도구 메뉴",
        noMatches: "일치하는 도구가 없습니다.",
        search: "도구 검색"
      },
      activeNote: "{category}의 {tool} 표시 중입니다. 전체 도구에서 전환하세요.",
      toolDrops: {
        addText: "PDF 하나 선택",
        annotate: "PDF 하나 선택",
        compress: "PDF 하나 선택",
        crop: "PDF 하나 선택",
        flatten: "PDF 하나 선택",
        image: "이미지 선택",
        merge: "PDF 파일 선택",
        metadata: "PDF 하나 선택",
        pageNumbers: "PDF 하나 선택",
        pdfExtract: "PDF 하나 선택",
        pdfImage: "PDF 하나 선택",
        pdfText: "PDF 하나 선택",
        removePassword: "보호된 PDF 선택",
        signature: "PDF 하나 선택",
        split: "PDF 하나 선택",
        spreadsheet: "스프레드시트 선택",
        text: "TXT 파일 선택",
        watermark: "PDF 하나 선택",
        word: "DOCX 파일 선택"
      },
      toolLabels: {
        addText: "텍스트 추가",
        annotate: "PDF 주석",
        compress: "PDF 압축",
        crop: "PDF 자르기",
        flatten: "PDF 플래튼",
        image: "이미지 PDF",
        merge: "PDF 병합",
        metadata: "메타데이터 편집",
        pageNumbers: "페이지 번호",
        pdfExtract: "이미지 추출",
        pdfImage: "PDF 이미지",
        pdfText: "PDF TXT",
        removePassword: "비밀번호 제거",
        signature: "PDF 서명",
        split: "PDF 분할",
        spreadsheet: "스프레드시트 PDF",
        text: "TXT PDF",
        watermark: "PDF 워터마크",
        word: "Word PDF"
      },
      toolHeadings: {
        addText: "PDF에 텍스트 추가",
        annotate: "PDF 주석",
        compress: "PDF 압축",
        crop: "PDF 자르기",
        flatten: "PDF 플래튼",
        image: "이미지 PDF 변환",
        merge: "PDF 병합",
        metadata: "메타데이터 편집",
        pageNumbers: "페이지 번호",
        pdfExtract: "PDF 이미지 추출",
        pdfImage: "PDF를 PNG/JPG로",
        pdfText: "PDF를 TXT로",
        removePassword: "PDF 비밀번호 제거",
        signature: "PDF 서명",
        split: "PDF 분할",
        spreadsheet: "스프레드시트 PDF 변환",
        text: "TXT PDF 변환",
        watermark: "PDF 워터마크",
        word: "Word PDF 변환"
      },
      toolActions: {
        addText: "텍스트 추가",
        annotate: "PDF 주석",
        compress: "PDF 압축",
        crop: "PDF 자르기",
        flatten: "PDF 플래튼",
        image: "이미지 변환",
        merge: "PDF 병합",
        metadata: "메타데이터 업데이트",
        pageNumbers: "페이지 번호 추가",
        pdfExtract: "이미지 추출",
        pdfImage: "이미지 내보내기",
        pdfText: "텍스트 추출",
        removePassword: "비밀번호 제거",
        signature: "PDF 서명",
        split: "PDF 분할",
        spreadsheet: "스프레드시트 변환",
        text: "텍스트 변환",
        watermark: "워터마크 추가",
        word: "Word 변환"
      }
    },
    tl: {
      code: "tl",
      categories: { all: "Lahat", edit: "Ayusin PDF", "from-pdf": "Mula PDF", "to-pdf": "Gawing PDF" },
      common: {
        clear: "Burahin",
        clearDrawing: "Burahin ang drawing",
        clearFile: "Alisin file",
        clearFiles: "Alisin files",
        clearSignature: "Burahin pirma",
        dark: "Madilim",
        fullViewSigner: "Buong view",
        howToUse: "Paano gamitin",
        install: "I-install",
        light: "Maliwanag",
        switchToDark: "Lumipat sa dark mode",
        switchToLight: "Lumipat sa light mode"
      },
      faq: [
        ["Magagamit ba ito walang internet?", "Oo. Kasama sa app ang PDF at file-reading libraries, kaya gumagana ito offline pagkatapos ma-cache sa device."],
        ["Bakit kailangan tingnan ang file order?", "Sinusunod ng merge at image conversion ang order. Gamitin ang drag handle o arrow bago gumawa ng PDF."],
        ["Anong page range format ang puwede?", "Gamitin ang pages, ranges, o pareho, tulad ng 1, 3-5, 8."],
        ["Mabubuksan ba ang password-protected PDF?", "Maaaring humingi ang PDFNest ng password para sa preview, export, image/text extraction, at password removal. Kailangan pa rin ng unlocked PDF ang karamihan ng edit tools."],
        ["Puwede bang alisin ang PDF password?", "Oo, kung alam mo ang password. Visual copy ang output, kaya maaaring hindi manatiling selectable ang text."],
        ["May Word, PowerPoint, OCR, o PDF to Office ba?", "Kailangan ng mas mabibigat na engine o backend para maging maaasahan ang advanced conversion na iyon."]
      ],
      footer: {
        about: "Tungkol",
        contact: "Contact",
        message: "Lokal sa browser ang pagproseso. Kapag nirefresh ang page, mawawala ang selected files at generated links.",
        privacy: "Privacy Policy",
        sitemap: "Sitemap"
      },
      header: {
        allTools: "Lahat ng Tools",
        eyebrow: "Private document tools",
        freeTools: "Libre",
        intro: "Mabilis na PDF tools na tumatakbo sa browser at nananatili sa device ang files.",
        noUpload: "Walang upload server",
        offline: "Gumagana offline"
      },
      home: {
        eyebrow: "PDF tools sa browser",
        title: "PDF tools. Mabilis. Simple. Private.",
        intro: "Mag-merge, split, compress, convert, sign, at extract ng files lokal sa browser.",
        uploadTitle: "I-drop dito ang PDF o image files",
        uploadCopy: "Pumili ng files para magsimula sa Merge PDF o Image to PDF.",
        uploadButton: "Pumili ng Files",
        uploadPrivacy: "Nananatili sa browser ang files. Walang upload server.",
        quickEyebrow: "Magsimula agad",
        quickTitle: "Quick Tools",
        viewAll: "Tingnan Lahat",
        proof: [
          ["Private ang disenyo", "Nananatili sa device ang selected files."],
          ["Offline ready", "Gumagana ang cached tools kahit walang internet."],
          ["Walang sign up", "Gamitin ang tools nang walang account."],
          ["Browser based", "Gumagana sa modern desktop at mobile browsers."]
        ]
      },
      history: {
        clear: "Burahin",
        file: "file",
        files: "files",
        latest: "Pinakabagong downloads sa session na ito.",
        moreHidden: "{count} mas lumang download ang nakatago. Burahin ang history para alisin.",
        noDownloads: "Wala pang downloads.",
        noFiles: "Walang files",
        title: "History"
      },
      instructions: {
        items: [
          "Buksan ang Lahat ng Tools at piliin ang kailangan.",
          "I-upload ang files para sa task.",
          "Suriin ang order bago mag-merge o mag-convert.",
          "I-click ang action button.",
          "Gamitin ang download link para sa output."
        ],
        title: "Instructions"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "Paano Gumagana ang Privacy",
        intro: "Tumutulong ang PDFNest sa merge, split, sign, watermark, page numbers, image conversion, text extraction, at known-password PDF unlocking nang walang upload server.",
        popular: "Popular Tools",
        privacy: "Privacy",
        privacyBody: "Lokal sa browser pinoproseso ang files. Temporary ang download links at nawawala kapag nirefresh o isinara ang page.",
        privacyLink: "Basahin ang Privacy Policy",
        privacyWorks: "Binabasa ng browser JavaScript ang selected files sa device, pinapatakbo ang tool, at gumagawa ng local download link.",
        title: "Gumawa sa documents sa browser",
        tools: "Private PDF tools"
      },
      toolsPanel: { choose: "Pumili ng PDF tool", close: "Isara ang tools menu", kicker: "Tool menu", noMatches: "Walang tugmang tools.", search: "Maghanap ng tools" },
      activeNote: "Ipinapakita ang {tool} sa {category}. Gamitin ang Lahat ng Tools para lumipat.",
      toolDrops: {
        addText: "Pumili ng isang PDF",
        annotate: "Pumili ng isang PDF",
        compress: "Pumili ng isang PDF",
        crop: "Pumili ng isang PDF",
        flatten: "Pumili ng isang PDF",
        image: "Pumili ng images",
        merge: "Pumili ng PDF files",
        metadata: "Pumili ng isang PDF",
        pageNumbers: "Pumili ng isang PDF",
        pdfExtract: "Pumili ng PDF",
        pdfImage: "Pumili ng PDF",
        pdfText: "Pumili ng PDF",
        removePassword: "Pumili ng protected PDF",
        signature: "Pumili ng isang PDF",
        split: "Pumili ng isang PDF",
        spreadsheet: "Pumili ng spreadsheets",
        text: "Pumili ng text files",
        watermark: "Pumili ng isang PDF",
        word: "Pumili ng Word files"
      },
      toolLabels: {
        addText: "Add Text",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Image to PDF",
        merge: "Merge PDFs",
        metadata: "Metadata",
        pageNumbers: "Page Numbers",
        pdfExtract: "Extract Images",
        pdfImage: "PDF to Images",
        pdfText: "PDF to TXT",
        removePassword: "Remove Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolHeadings: {
        addText: "Add Text / Fill PDF",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Image to PDF",
        merge: "Merge PDFs",
        metadata: "Edit PDF Metadata",
        pageNumbers: "Page Numbers PDF",
        pdfExtract: "Extract Images from PDF",
        pdfImage: "PDF to PNG/JPG",
        pdfText: "PDF to TXT",
        removePassword: "Remove PDF Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolActions: {
        addText: "Mag-add ng Text",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Convert Images",
        merge: "Merge PDFs",
        metadata: "Update Metadata",
        pageNumbers: "Add Page Numbers",
        pdfExtract: "Extract Images",
        pdfImage: "Export Images",
        pdfText: "Extract Text",
        removePassword: "Remove Password",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Convert Spreadsheet",
        text: "Convert Text",
        watermark: "Add Watermark",
        word: "Convert Word"
      }
    },
    es: {
      code: "es",
      categories: { all: "Todo", edit: "Editar PDF", "from-pdf": "Desde PDF", "to-pdf": "Convertir a PDF" },
      common: {
        clear: "Borrar",
        clearDrawing: "Borrar dibujo",
        clearFile: "Borrar archivo",
        clearFiles: "Borrar archivos",
        clearSignature: "Borrar firma",
        dark: "Oscuro",
        fullViewSigner: "Vista completa",
        howToUse: "Como usar",
        install: "Instalar app",
        light: "Claro",
        switchToDark: "Cambiar a modo oscuro",
        switchToLight: "Cambiar a modo claro"
      },
      faq: [
        ["Puedo usarlo sin internet?", "Si. Las bibliotecas de PDF y lectura de archivos estan incluidas localmente, asi que puede funcionar offline despues de guardarse en el navegador."],
        ["Por que revisar el orden de archivos?", "Unir PDF y convertir imagenes mantienen el orden seleccionado. Ajusta la lista antes de crear el PDF."],
        ["Que formato de rango funciona?", "Usa paginas individuales, rangos o ambos, como 1, 3-5, 8."],
        ["Puede abrir PDF con contrasena?", "PDFNest puede pedir contrasena para vistas previas, exportar, extraer imagenes/texto y quitar contrasena. Muchas herramientas de edicion aun necesitan un PDF desbloqueado."],
        ["Puedo quitar una contrasena de PDF?", "Si, solo si ya conoces la contrasena. La salida se reconstruye visualmente, por eso el texto podria no quedar seleccionable."],
        ["Convierte Word, PowerPoint, OCR o PDF a Office?", "Esas conversiones avanzadas necesitan motores mas grandes u otro backend para ser confiables."]
      ],
      footer: {
        about: "Acerca de",
        contact: "Contacto",
        message: "Todo el procesamiento ocurre localmente en tu navegador. Al actualizar la pagina se borran archivos seleccionados y enlaces generados.",
        privacy: "Politica de privacidad",
        sitemap: "Sitemap"
      },
      header: {
        allTools: "Herramientas",
        eyebrow: "Herramientas privadas",
        freeTools: "Gratis",
        intro: "Herramientas PDF rapidas que funcionan en tu navegador y mantienen tus archivos en tu dispositivo.",
        noUpload: "Sin servidor de subida",
        offline: "Funciona offline"
      },
      home: {
        eyebrow: "Herramientas PDF en el navegador",
        title: "PDF tools. Rapido. Simple. Privado.",
        intro: "Une, divide, comprime, convierte, firma y extrae archivos localmente en tu navegador.",
        uploadTitle: "Suelta archivos PDF o imagenes aqui",
        uploadCopy: "Elige archivos para empezar con Merge PDF o Image to PDF.",
        uploadButton: "Elegir archivos",
        uploadPrivacy: "Los archivos se quedan en tu navegador. Sin servidor de subida.",
        quickEyebrow: "Empieza rapido",
        quickTitle: "Herramientas rapidas",
        viewAll: "Ver todas",
        proof: [
          ["Privado por diseno", "Los archivos seleccionados se quedan en tu dispositivo."],
          ["Listo offline", "Las herramientas guardadas pueden funcionar sin internet."],
          ["Sin registro", "Usa las herramientas sin cuentas."],
          ["Basado en navegador", "Funciona en navegadores modernos de escritorio y movil."]
        ]
      },
      history: {
        clear: "Borrar",
        file: "archivo",
        files: "archivos",
        latest: "Descargas recientes de esta sesion.",
        moreHidden: "{count} descargas antiguas ocultas. Borra el historial para quitarlas.",
        noDownloads: "Aun no hay descargas.",
        noFiles: "Sin archivos",
        title: "Historial"
      },
      instructions: {
        items: [
          "Abre Herramientas y elige lo que necesitas.",
          "Sube los archivos para la tarea.",
          "Revisa el orden antes de unir o convertir.",
          "Haz clic en el boton de accion.",
          "Usa el enlace de descarga del resultado."
        ],
        title: "Instrucciones"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "Como funciona la privacidad",
        intro: "PDFNest ayuda con unir, dividir, firmar, marcas de agua, numerar paginas, convertir imagenes, extraer texto y quitar contrasenas conocidas sin servidor de subida.",
        popular: "Herramientas populares",
        privacy: "Privacidad",
        privacyBody: "Los archivos se procesan localmente en tu navegador. Los enlaces de descarga son temporales.",
        privacyLink: "Leer la politica de privacidad",
        privacyWorks: "JavaScript del navegador lee los archivos en tu dispositivo, ejecuta la herramienta y crea un enlace local de descarga.",
        title: "Trabaja con documentos en tu navegador",
        tools: "Herramientas PDF privadas"
      },
      toolsPanel: { choose: "Elige una herramienta PDF", close: "Cerrar menu de herramientas", kicker: "Menu de herramientas", noMatches: "Sin resultados.", search: "Buscar herramientas" },
      activeNote: "Mostrando {tool} en {category}. Usa Herramientas para cambiar.",
      toolDrops: {
        addText: "Selecciona un PDF",
        annotate: "Selecciona un PDF",
        compress: "Selecciona un PDF",
        crop: "Selecciona un PDF",
        flatten: "Selecciona un PDF",
        image: "Selecciona imagenes",
        merge: "Selecciona archivos PDF",
        metadata: "Selecciona un PDF",
        pageNumbers: "Selecciona un PDF",
        pdfExtract: "Selecciona un PDF",
        pdfImage: "Selecciona un PDF",
        pdfText: "Selecciona un PDF",
        removePassword: "Selecciona un PDF protegido",
        signature: "Selecciona un PDF",
        split: "Selecciona un PDF",
        spreadsheet: "Selecciona hojas de calculo",
        text: "Selecciona archivos de texto",
        watermark: "Selecciona un PDF",
        word: "Selecciona archivos Word"
      },
      toolLabels: {
        addText: "Agregar texto",
        annotate: "Anotar PDF",
        compress: "Comprimir PDF",
        crop: "Recortar PDF",
        flatten: "Aplanar PDF",
        image: "Imagen a PDF",
        merge: "Unir PDF",
        metadata: "Metadatos",
        pageNumbers: "Numerar paginas",
        pdfExtract: "Extraer imagenes",
        pdfImage: "PDF a imagenes",
        pdfText: "PDF a TXT",
        removePassword: "Quitar contrasena",
        signature: "Firmar PDF",
        split: "Dividir PDF",
        spreadsheet: "Hoja a PDF",
        text: "TXT a PDF",
        watermark: "Marca de agua",
        word: "Word a PDF"
      },
      toolHeadings: {
        addText: "Agregar texto / Rellenar PDF",
        annotate: "Anotar PDF",
        compress: "Comprimir PDF",
        crop: "Recortar PDF",
        flatten: "Aplanar PDF",
        image: "Imagen a PDF",
        merge: "Unir PDF",
        metadata: "Editar metadatos PDF",
        pageNumbers: "Numeros de pagina PDF",
        pdfExtract: "Extraer imagenes de PDF",
        pdfImage: "PDF a PNG/JPG",
        pdfText: "PDF a TXT",
        removePassword: "Quitar contrasena PDF",
        signature: "Firmar PDF",
        split: "Dividir PDF",
        spreadsheet: "Hoja de calculo a PDF",
        text: "TXT a PDF",
        watermark: "Marca de agua PDF",
        word: "Word a PDF"
      },
      toolActions: {
        addText: "Agregar texto",
        annotate: "Anotar PDF",
        compress: "Comprimir PDF",
        crop: "Recortar PDF",
        flatten: "Aplanar PDF",
        image: "Convertir imagenes",
        merge: "Unir PDF",
        metadata: "Actualizar metadatos",
        pageNumbers: "Agregar numeros",
        pdfExtract: "Extraer imagenes",
        pdfImage: "Exportar imagenes",
        pdfText: "Extraer texto",
        removePassword: "Quitar contrasena",
        signature: "Firmar PDF",
        split: "Dividir PDF",
        spreadsheet: "Convertir hoja",
        text: "Convertir texto",
        watermark: "Agregar marca",
        word: "Convertir Word"
      }
    },
    id: {
      code: "id",
      categories: { all: "Semua", edit: "Edit PDF", "from-pdf": "Dari PDF", "to-pdf": "Ke PDF" },
      common: {
        clear: "Bersihkan",
        clearDrawing: "Hapus gambar",
        clearFile: "Hapus file",
        clearFiles: "Hapus file",
        clearSignature: "Hapus tanda tangan",
        dark: "Gelap",
        fullViewSigner: "Tampilan penuh",
        howToUse: "Cara pakai",
        install: "Instal app",
        light: "Terang",
        switchToDark: "Ganti ke mode gelap",
        switchToLight: "Ganti ke mode terang"
      },
      faq: [
        ["Bisa dipakai tanpa internet?", "Bisa. Library PDF dan pembaca file sudah disertakan lokal, jadi app dapat berjalan offline setelah tersimpan di browser."],
        ["Mengapa urutan file perlu dicek?", "Merge dan konversi gambar mengikuti urutan pilihan. Atur daftar sebelum membuat PDF."],
        ["Format rentang halaman apa yang bisa?", "Gunakan halaman, rentang, atau keduanya, seperti 1, 3-5, 8."],
        ["Bisa membuka PDF berpassword?", "PDFNest bisa meminta password untuk preview, export, ekstrak gambar/teks, dan hapus password. Banyak tool edit tetap perlu PDF yang sudah terbuka."],
        ["Bisa menghapus password PDF?", "Bisa jika Anda sudah tahu passwordnya. Output dibuat ulang secara visual, jadi teks mungkin tidak bisa dipilih."],
        ["Bisa konversi Word, PowerPoint, OCR, atau PDF ke Office?", "Konversi lanjutan tersebut butuh engine yang lebih besar atau backend agar akurat."]
      ],
      footer: {
        about: "Tentang",
        contact: "Kontak",
        message: "Semua proses berjalan lokal di browser. Refresh halaman akan menghapus file pilihan dan link hasil.",
        privacy: "Kebijakan Privasi",
        sitemap: "Sitemap"
      },
      header: {
        allTools: "Semua Tool",
        eyebrow: "Tool dokumen privat",
        freeTools: "Gratis",
        intro: "Tool PDF cepat yang berjalan di browser dan menjaga file tetap di perangkat Anda.",
        noUpload: "Tanpa server upload",
        offline: "Bisa offline"
      },
      home: {
        eyebrow: "Tool PDF di browser",
        title: "PDF tools. Cepat. Simpel. Privat.",
        intro: "Gabung, pisah, kompres, konversi, tanda tangani, dan ekstrak file lokal di browser.",
        uploadTitle: "Letakkan PDF atau gambar di sini",
        uploadCopy: "Pilih file untuk mulai dengan Merge PDF atau Image to PDF.",
        uploadButton: "Pilih File",
        uploadPrivacy: "File tetap di browser Anda. Tanpa server upload.",
        quickEyebrow: "Mulai cepat",
        quickTitle: "Quick Tools",
        viewAll: "Lihat semua",
        proof: [
          ["Privat sejak awal", "File pilihan tetap di perangkat Anda."],
          ["Siap offline", "Tool yang tersimpan bisa berjalan tanpa internet."],
          ["Tanpa daftar", "Gunakan tool tanpa akun."],
          ["Berbasis browser", "Berjalan di browser desktop dan mobile modern."]
        ]
      },
      history: {
        clear: "Bersihkan",
        file: "file",
        files: "file",
        latest: "Download terbaru dari sesi ini.",
        moreHidden: "{count} download lama disembunyikan. Bersihkan riwayat untuk menghapusnya.",
        noDownloads: "Belum ada download.",
        noFiles: "Tidak ada file",
        title: "Riwayat"
      },
      instructions: {
        items: [
          "Buka Semua Tool dan pilih tool yang diperlukan.",
          "Upload file untuk tugas Anda.",
          "Cek urutan sebelum merge atau konversi.",
          "Klik tombol aksi.",
          "Gunakan link download untuk hasilnya."
        ],
        title: "Instruksi"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "Cara Privasi Bekerja",
        intro: "PDFNest membantu merge, split, tanda tangan, watermark, nomor halaman, konversi gambar, ekstrak teks, dan membuka PDF dengan password yang diketahui tanpa server upload.",
        popular: "Tool Populer",
        privacy: "Privasi",
        privacyBody: "File diproses lokal di browser. Link download bersifat sementara dan hilang saat halaman ditutup atau direfresh.",
        privacyLink: "Baca Kebijakan Privasi",
        privacyWorks: "JavaScript browser membaca file di perangkat, menjalankan tool, lalu membuat link download lokal.",
        title: "Kelola dokumen di browser",
        tools: "Tool PDF privat"
      },
      toolsPanel: { choose: "Pilih tool PDF", close: "Tutup menu tool", kicker: "Menu tool", noMatches: "Tidak ada tool cocok.", search: "Cari tool" },
      activeNote: "Menampilkan {tool} di {category}. Gunakan Semua Tool untuk berpindah.",
      toolDrops: {
        addText: "Pilih satu PDF",
        annotate: "Pilih satu PDF",
        compress: "Pilih satu PDF",
        crop: "Pilih satu PDF",
        flatten: "Pilih satu PDF",
        image: "Pilih gambar",
        merge: "Pilih file PDF",
        metadata: "Pilih satu PDF",
        pageNumbers: "Pilih satu PDF",
        pdfExtract: "Pilih PDF",
        pdfImage: "Pilih PDF",
        pdfText: "Pilih PDF",
        removePassword: "Pilih PDF terlindungi",
        signature: "Pilih satu PDF",
        split: "Pilih satu PDF",
        spreadsheet: "Pilih spreadsheet",
        text: "Pilih file teks",
        watermark: "Pilih satu PDF",
        word: "Pilih file Word"
      },
      toolLabels: {
        addText: "Tambah Teks",
        annotate: "Anotasi PDF",
        compress: "Kompres PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Gambar ke PDF",
        merge: "Gabung PDF",
        metadata: "Metadata",
        pageNumbers: "Nomor Halaman",
        pdfExtract: "Ekstrak Gambar",
        pdfImage: "PDF ke Gambar",
        pdfText: "PDF ke TXT",
        removePassword: "Hapus Password",
        signature: "Tanda Tangan",
        split: "Pisah PDF",
        spreadsheet: "Spreadsheet ke PDF",
        text: "TXT ke PDF",
        watermark: "Watermark PDF",
        word: "Word ke PDF"
      },
      toolHeadings: {
        addText: "Tambah Teks / Isi PDF",
        annotate: "Anotasi PDF",
        compress: "Kompres PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Gambar ke PDF",
        merge: "Gabung PDF",
        metadata: "Edit Metadata PDF",
        pageNumbers: "Nomor Halaman PDF",
        pdfExtract: "Ekstrak Gambar dari PDF",
        pdfImage: "PDF ke PNG/JPG",
        pdfText: "PDF ke TXT",
        removePassword: "Hapus Password PDF",
        signature: "Tanda Tangan PDF",
        split: "Pisah PDF",
        spreadsheet: "Spreadsheet ke PDF",
        text: "TXT ke PDF",
        watermark: "Watermark PDF",
        word: "Word ke PDF"
      },
      toolActions: {
        addText: "Tambah Teks",
        annotate: "Anotasi PDF",
        compress: "Kompres PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Konversi Gambar",
        merge: "Gabung PDF",
        metadata: "Update Metadata",
        pageNumbers: "Tambah Nomor",
        pdfExtract: "Ekstrak Gambar",
        pdfImage: "Export Gambar",
        pdfText: "Ekstrak Teks",
        removePassword: "Hapus Password",
        signature: "Tanda Tangan PDF",
        split: "Pisah PDF",
        spreadsheet: "Konversi Spreadsheet",
        text: "Konversi Teks",
        watermark: "Tambah Watermark",
        word: "Konversi Word"
      }
    },
    hi: {
      code: "hi",
      categories: { all: "सभी", edit: "PDF संपादित", "from-pdf": "PDF से", "to-pdf": "PDF में" },
      common: {
        clear: "साफ करें",
        clearDrawing: "ड्रॉइंग साफ करें",
        clearFile: "फाइल हटाएं",
        clearFiles: "फाइलें हटाएं",
        clearSignature: "हस्ताक्षर हटाएं",
        dark: "डार्क",
        fullViewSigner: "फुल व्यू",
        howToUse: "कैसे उपयोग करें",
        install: "ऐप इंस्टॉल",
        light: "लाइट",
        switchToDark: "डार्क मोड करें",
        switchToLight: "लाइट मोड करें"
      },
      faq: [
        ["क्या यह बिना इंटरनेट चलेगा?", "हां. PDF और फाइल पढ़ने वाली लाइब्रेरी स्थानीय रूप से शामिल हैं, इसलिए कैश होने के बाद यह ऑफलाइन चल सकता है."],
        ["फाइल क्रम क्यों जांचें?", "Merge और image conversion चुने गए क्रम को रखते हैं. PDF बनाने से पहले क्रम बदलें."],
        ["कौन सा page range format चलेगा?", "अलग पेज, range, या दोनों लिखें, जैसे 1, 3-5, 8."],
        ["क्या password-protected PDF खुल सकता है?", "PDFNest preview, export, image/text extraction और password removal के लिए password पूछ सकता है. कई edit tools को unlocked PDF चाहिए."],
        ["क्या PDF password हट सकता है?", "हां, अगर आपको password पता है. Output visual copy होता है, इसलिए selectable text बचा न रहे."],
        ["क्या Word, PowerPoint, OCR या PDF to Office है?", "इन advanced conversions के लिए बड़े engines या backend की जरूरत होती है."]
      ],
      footer: {
        about: "About",
        contact: "Contact",
        message: "सारी processing browser में स्थानीय रूप से होती है. Page refresh करने पर selected files और generated links साफ हो जाते हैं.",
        privacy: "Privacy Policy",
        sitemap: "Sitemap"
      },
      header: {
        allTools: "सभी Tools",
        eyebrow: "Private document tools",
        freeTools: "Free tools",
        intro: "तेज PDF tools जो browser में चलते हैं और files आपके device पर रहती हैं.",
        noUpload: "Upload server नहीं",
        offline: "Offline चलता है"
      },
      history: {
        clear: "साफ करें",
        file: "फाइल",
        files: "फाइलें",
        latest: "इस session की latest downloads.",
        moreHidden: "{count} पुरानी downloads छिपी हैं. उन्हें हटाने के लिए history साफ करें.",
        noDownloads: "अभी downloads नहीं हैं.",
        noFiles: "फाइल नहीं",
        title: "History"
      },
      instructions: {
        items: [
          "सभी Tools खोलें और अपना tool चुनें.",
          "अपने काम के लिए files upload करें.",
          "Merge या convert से पहले order जांचें.",
          "Action button क्लिक करें.",
          "Output के download link का उपयोग करें."
        ],
        title: "Instructions"
      },
      seo: {
        faq: "FAQ",
        howPrivacy: "Privacy कैसे काम करती है",
        intro: "PDFNest merge, split, sign, watermark, page numbers, image conversion, text extraction और known-password PDF unlocking बिना upload server करता है.",
        popular: "Popular Tools",
        privacy: "Privacy",
        privacyBody: "Files आपके browser में स्थानीय रूप से process होती हैं. Download links temporary होते हैं.",
        privacyLink: "Privacy Policy पढ़ें",
        privacyWorks: "Browser JavaScript device पर selected files पढ़ता है, tool चलाता है, और local download link बनाता है.",
        title: "Browser में documents पर काम करें",
        tools: "Private PDF tools"
      },
      toolsPanel: { choose: "PDF tool चुनें", close: "Tools menu बंद करें", kicker: "Tool menu", noMatches: "कोई matching tools नहीं.", search: "Tools खोजें" },
      activeNote: "{category} में {tool} दिख रहा है. बदलने के लिए सभी Tools इस्तेमाल करें.",
      toolDrops: {
        addText: "एक PDF चुनें",
        annotate: "एक PDF चुनें",
        compress: "एक PDF चुनें",
        crop: "एक PDF चुनें",
        flatten: "एक PDF चुनें",
        image: "Images चुनें",
        merge: "PDF files चुनें",
        metadata: "एक PDF चुनें",
        pageNumbers: "एक PDF चुनें",
        pdfExtract: "PDF चुनें",
        pdfImage: "PDF चुनें",
        pdfText: "PDF चुनें",
        removePassword: "Protected PDF चुनें",
        signature: "एक PDF चुनें",
        split: "एक PDF चुनें",
        spreadsheet: "Spreadsheets चुनें",
        text: "Text files चुनें",
        watermark: "एक PDF चुनें",
        word: "Word files चुनें"
      },
      toolLabels: {
        addText: "Text जोड़ें",
        annotate: "PDF annotate",
        compress: "PDF compress",
        crop: "PDF crop",
        flatten: "PDF flatten",
        image: "Image to PDF",
        merge: "PDF merge",
        metadata: "Metadata",
        pageNumbers: "Page numbers",
        pdfExtract: "Images निकालें",
        pdfImage: "PDF to Images",
        pdfText: "PDF to TXT",
        removePassword: "Password हटाएं",
        signature: "PDF sign",
        split: "PDF split",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolHeadings: {
        addText: "Text जोड़ें / PDF भरें",
        annotate: "PDF Annotate",
        compress: "PDF Compress",
        crop: "PDF Crop",
        flatten: "PDF Flatten",
        image: "Image to PDF",
        merge: "PDF Merge",
        metadata: "PDF Metadata संपादित करें",
        pageNumbers: "PDF Page Numbers",
        pdfExtract: "PDF से Images निकालें",
        pdfImage: "PDF to PNG/JPG",
        pdfText: "PDF to TXT",
        removePassword: "PDF Password हटाएं",
        signature: "PDF Sign",
        split: "PDF Split",
        spreadsheet: "Spreadsheet to PDF",
        text: "TXT to PDF",
        watermark: "Watermark PDF",
        word: "Word to PDF"
      },
      toolActions: {
        addText: "Text जोड़ें",
        annotate: "Annotate PDF",
        compress: "Compress PDF",
        crop: "Crop PDF",
        flatten: "Flatten PDF",
        image: "Images Convert करें",
        merge: "Merge PDFs",
        metadata: "Metadata Update",
        pageNumbers: "Page Numbers जोड़ें",
        pdfExtract: "Images निकालें",
        pdfImage: "Images Export",
        pdfText: "Text निकालें",
        removePassword: "Password हटाएं",
        signature: "Sign PDF",
        split: "Split PDF",
        spreadsheet: "Spreadsheet Convert",
        text: "Text Convert",
        watermark: "Watermark जोड़ें",
        word: "Word Convert"
      }
    }
  };

  const shellUiText = {
    en: {
      appearance: "Appearance",
      language: "Language",
      noRecent: "No recent tools yet.",
      recent: "Recent",
      settings: "Settings"
    },
    es: {
      appearance: "Apariencia",
      language: "Idioma",
      noRecent: "Aun no hay herramientas recientes.",
      recent: "Recientes",
      settings: "Ajustes"
    },
    hi: {
      appearance: "Appearance",
      language: "भाषा",
      noRecent: "अभी recent tools नहीं हैं.",
      recent: "Recent",
      settings: "Settings"
    },
    id: {
      appearance: "Tampilan",
      language: "Bahasa",
      noRecent: "Belum ada tool terbaru.",
      recent: "Terbaru",
      settings: "Pengaturan"
    },
    ja: {
      appearance: "表示",
      language: "言語",
      noRecent: "最近使ったツールはまだありません。",
      recent: "最近",
      settings: "設定"
    },
    zh: {
      appearance: "外观",
      language: "语言",
      noRecent: "还没有最近使用的工具。",
      recent: "最近",
      settings: "设置"
    },
    ko: {
      appearance: "화면",
      language: "언어",
      noRecent: "최근 사용한 도구가 아직 없습니다.",
      recent: "최근",
      settings: "설정"
    },
    tl: {
      appearance: "Itsura",
      language: "Wika",
      noRecent: "Wala pang recent tools.",
      recent: "Recent",
      settings: "Settings"
    }
  };

  function getLanguage() {
    return languageData[state.language] || languageData.en;
  }

  function getShellText() {
    return shellUiText[state.language] || shellUiText.en;
  }

  function getToolLabel(tool) {
    const language = getLanguage();
    return language.toolLabels[tool] || toolLabels[tool] || "PDF tool";
  }

  function getToolHeading(tool) {
    const language = getLanguage();
    return language.toolHeadings[tool] || getToolLabel(tool);
  }

  function getToolDropTitle(tool) {
    const language = getLanguage();
    return language.toolDrops[tool] || "Select file";
  }

  function getToolAction(tool) {
    const language = getLanguage();
    return language.toolActions[tool] || getToolLabel(tool);
  }

  function getToolDescription(tool) {
    const localized = localizedToolDescriptions[state.language] || {};
    return localized[tool] || toolDescriptions[tool] || "";
  }

  function getMenuDescription(tool) {
    const localized = localizedMenuDescriptions[state.language] || {};

    if (localized[tool]) {
      return localized[tool];
    }

    return toolsMenuMeta[tool] && toolsMenuMeta[tool].description
      ? toolsMenuMeta[tool].description
      : getToolDescription(tool);
  }

  function getMenuBadge(tool) {
    const badge = toolsMenuMeta[tool] && toolsMenuMeta[tool].badge;
    const labels = menuBadgeLabels[state.language] || menuBadgeLabels.en;

    return badge ? labels[badge] || badge : "";
  }

  function getToolForId(toolId) {
    const tool = getToolById(toolId);
    return tool ? tool.tool || tool.id : "";
  }

  function getToolKeyFromCardId(toolId) {
    const item = toolUiMap.find((tool) => tool.id === toolId);
    return item ? item.tool : "";
  }

  function getToolIconSvg(toolKey) {
    const markup = toolIconMarkup[toolKey] || toolIconMarkup.merge;
    return `
      <svg class="tool-icon-svg" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
        ${markup}
      </svg>
    `;
  }

  function renderToolIcons() {
    document.querySelectorAll(".quick-tool-card[data-tool-id]").forEach((button) => {
      const slot = button.querySelector(".quick-tool-icon");
      const toolKey = getToolKeyFromCardId(button.dataset.toolId);

      if (slot && toolKey) {
        slot.innerHTML = getToolIconSvg(toolKey);
      }
    });

    toolUiMap.forEach((tool) => {
      const card = document.getElementById(tool.id);
      const titleColumn = card ? card.querySelector(".card-heading > div:first-child") : null;

      if (!titleColumn) return;

      let icon = titleColumn.querySelector(".tool-card-icon");

      if (!icon) {
        icon = document.createElement("span");
        icon.className = "tool-card-icon";
        icon.setAttribute("aria-hidden", "true");
        titleColumn.prepend(icon);
      }

      icon.innerHTML = getToolIconSvg(tool.tool);
    });
  }

  function updateQuickToolCards() {
    document.querySelectorAll(".quick-tool-card[data-tool-id]").forEach((button) => {
      const toolKey = getToolKeyFromCardId(button.dataset.toolId);

      if (!toolKey) return;

      const title = getToolLabel(toolKey);
      const description = getMenuDescription(toolKey);

      setText(button.querySelector("strong"), title);
      setText(button.querySelector("small"), description);
      button.setAttribute("aria-label", `${title}: ${description}`);
    });
  }

  function renderToolNavButton(button, toolKey) {
    if (!button || !toolKey) return;

    const badge = getMenuBadge(toolKey);
    const description = getMenuDescription(toolKey);
    const icon = getToolIconSvg(toolKey);

    button.innerHTML = `
      <span class="tools-nav-main">
        <span class="tools-nav-name-wrap">
          <span class="tools-nav-icon" aria-hidden="true">${icon}</span>
          <span class="tools-nav-name">${escapeHtml(getToolLabel(toolKey))}</span>
        </span>
        ${badge ? `<span class="tools-nav-badge">${escapeHtml(badge)}</span>` : ""}
      </span>
      <span class="tools-nav-description">${escapeHtml(description)}</span>
    `;
  }

  function getCategoryLabel(category) {
    const language = getLanguage();
    return language.categories[category] || toolCategoryLabels[category] || "PDF tool";
  }

  function formatLanguageText(template, values) {
    return String(template || "").replace(/\{([a-z]+)\}/gi, (match, key) => (
      Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match
    ));
  }

  function setText(target, value) {
    const element = typeof target === "string" ? document.querySelector(target) : target;

    if (element && value !== undefined) {
      element.textContent = value;
    }
  }

  function setAttr(target, attr, value) {
    const element = typeof target === "string" ? document.querySelector(target) : target;

    if (element && value !== undefined) {
      element.setAttribute(attr, value);
    }
  }

  function setTrustPill(index, text) {
    const pill = document.querySelectorAll(".trust-pill")[index];

    if (!pill) return;

    const dot = pill.querySelector(".trust-dot");
    const dotClass = dot ? dot.className : "trust-dot";
    const nextDot = document.createElement("span");
    nextDot.className = dotClass;
    pill.replaceChildren(nextDot, document.createTextNode(text));
  }

  function renderHomeTitle(title) {
    const element = document.getElementById("homeHeroTitle");

    if (!element) return;

    const parts = String(title || "").split(".").map((part) => part.trim()).filter(Boolean);

    if (parts.length < 4) {
      element.textContent = title;
      return;
    }

    const blue = document.createElement("span");
    blue.className = "home-word-blue";
    blue.textContent = `${parts[1]}.`;

    const green = document.createElement("span");
    green.className = "home-word-green";
    green.textContent = `${parts[2]}.`;

    element.replaceChildren(
      document.createTextNode(`${parts[0]}. `),
      blue,
      document.createTextNode(" "),
      green,
      document.createTextNode(` ${parts.slice(3).join(". ")}.`)
    );
  }

  function updateInstructionList(items) {
    document.querySelectorAll(".instructions ol li").forEach((item, index) => {
      if (items[index]) {
        item.textContent = items[index];
      }
    });
  }

  function updateSeoContent(language) {
    const articles = document.querySelectorAll(".compact-seo-section article");

    if (articles[0]) {
      setText(articles[0].querySelector(".eyebrow"), language.seo.tools);
      setText(articles[0].querySelector("h2"), language.seo.title);
      setText(articles[0].querySelector("p:last-child"), language.seo.intro);
    }

    if (articles[1]) {
      setText(articles[1].querySelector("h2"), language.seo.privacy);
      setText(articles[1].querySelector("p"), language.seo.privacyBody);
      setText(articles[1].querySelector(".text-link"), language.seo.privacyLink);
    }

    if (articles[2]) {
      setText(articles[2].querySelector("h2"), language.seo.howPrivacy);
      setText(articles[2].querySelector("p"), language.seo.privacyWorks);
    }

    if (articles[3]) {
      setText(articles[3].querySelector("h2"), language.seo.popular);
      articles[3].querySelectorAll(".link-list a").forEach((link) => {
        const tool = pageToolMap[link.getAttribute("href")];

        if (tool) {
          link.textContent = getToolLabel(tool);
        }
      });
    }

    if (articles[4]) {
      setText(articles[4].querySelector("h2"), language.seo.faq);
      articles[4].querySelectorAll("details").forEach((detail, index) => {
        const faq = language.faq[index];

        if (!faq) return;

        setText(detail.querySelector("summary"), faq[0]);
        setText(detail.querySelector("p"), faq[1]);
      });
    }
  }

  function updateToolText(language) {
    toolUiMap.forEach((tool) => {
      const card = document.getElementById(tool.id);
      const navButton = document.querySelector(`.tools-nav-button[href="#${tool.id}"]`);
      const actionButton = document.getElementById(tool.actionId);
      const clearButton = document.getElementById(tool.clearId);

      renderToolNavButton(navButton, tool.tool);

      if (card) {
        setText(card.querySelector(".card-heading h2"), getToolHeading(tool.tool));
        let description = card.querySelector(".tool-description");

        if (!description) {
          description = document.createElement("p");
          description.className = "tool-description";
          card.querySelector(".card-heading h2").after(description);
        }

        setText(description, getToolDescription(tool.tool));
        setText(card.querySelector(".drop-title"), getToolDropTitle(tool.tool));
        setText(card.querySelector(".drop-copy"), getToolDescription(tool.tool));
      }

      setText(actionButton, getToolAction(tool.tool));
      setText(clearButton, tool.clearType === "files" ? language.common.clearFiles : language.common.clearFile);
    });

    document.querySelectorAll(".mini-steps-title").forEach((title) => {
      title.textContent = language.common.howToUse;
    });

    setText("#signaturePadClear", language.common.clearSignature);
    setText("#annotationPadClear", language.common.clearDrawing);
    setText("#signatureFullButton", language.common.fullViewSigner);
    setText("#signatureFullClear", language.common.clearDrawing);
    setText("#signatureFullSign", getToolAction("signature"));
  }

  function applyLanguage() {
    const language = getLanguage();
    const shellText = getShellText();

    document.documentElement.lang = language.code;

    if (els.languageSelect) {
      els.languageSelect.value = state.language;
      els.languageSelect.setAttribute("aria-label", shellText.language);
    }

    setText(".brand-copy .eyebrow", language.header.eyebrow);
    setText(".brand-hero > .intro", language.header.intro);
    setTrustPill(0, language.header.noUpload);
    setTrustPill(1, language.header.offline);
    setTrustPill(2, language.header.freeTools);
    const homeText = language.home || languageData.en.home;
    setText(".home-hero-copy .eyebrow", homeText.eyebrow);
    renderHomeTitle(homeText.title);
    setText(".home-hero-copy p:last-child", homeText.intro);
    setText(".home-upload-title", homeText.uploadTitle);
    setText(".home-upload-copy", homeText.uploadCopy);
    setText(".home-upload-button", homeText.uploadButton);
    setText(".home-upload-privacy", homeText.uploadPrivacy);
    setText(".home-section-heading .eyebrow", homeText.quickEyebrow);
    setText("#quickToolsTitle", homeText.quickTitle);
    setText("#quickAllTools", homeText.viewAll);
    updateQuickToolCards();
    document.querySelectorAll(".home-proof-row article").forEach((article, index) => {
      const proof = homeText.proof[index];

      if (!proof) return;

      setText(article.querySelector("h2"), proof[0]);
      setText(article.querySelector("p"), proof[1]);
    });
    setText(els.toolNavToggle.querySelector("span"), language.header.allTools);
    setText(".tools-panel-kicker", language.toolsPanel.kicker);
    setText(".tools-panel-top strong", language.toolsPanel.choose);
    setText("#toolSearchEmpty", language.toolsPanel.noMatches);
    setAttr(els.toolNavClose, "aria-label", language.toolsPanel.close);
    setText("#settingsTitleText", shellText.settings);
    setAttr("#settingsTitle", "aria-label", shellText.settings);
    setAttr("#settingsTitle", "title", shellText.settings);
    setText("#settingsLanguageLabel", shellText.language);
    setText("#settingsAppearanceLabel", shellText.appearance);
    setText(els.recentToolsLabel, shellText.recent);

    if (els.toolSearch) {
      els.toolSearch.placeholder = language.toolsPanel.search;
    }

    document.querySelectorAll(".tool-category-button").forEach((button) => {
      const category = button.dataset.toolCategory;
      button.textContent = language.categories[category] || button.textContent;
    });

    document.querySelectorAll(".tools-nav-label").forEach((label) => {
      const group = label.closest(".tools-nav-group");
      const category = group ? group.dataset.toolCategory : "";
      label.textContent = getCategoryLabel(category);
    });

    document.querySelectorAll(".tool-section-label").forEach((label) => {
      const category = label.dataset.toolCategory;
      label.textContent = getCategoryLabel(category);
    });

    updateToolText(language);
    renderToolIcons();
    setText(".instructions h2", language.instructions.title);
    updateInstructionList(language.instructions.items);
    setText(".download-history-title", language.history.title);
    setText(".download-history-note", language.history.latest);
    setText(els.downloadHistoryClear, language.history.clear);
    setText(els.installButton, language.common.install);
    updateSeoContent(language);

    const footerLinks = document.querySelectorAll(".footer-links a");
    setText(".app-footer > p:first-child", language.footer.message);
    setText(footerLinks[0], language.footer.about);
    setText(footerLinks[1], language.footer.contact);
    setText(footerLinks[2], language.footer.privacy);
    setText(footerLinks[3], language.footer.sitemap);

    setDarkMode(document.body.classList.contains("dark-mode"), false);
    annotateToolSearchTargets();
    applyToolFilter(els.toolSearch.value, getActiveToolCategory());
    updateActiveToolNote(state.activeToolId || getDefaultToolId());
    renderDownloadHistory();
    renderRecentTools();
  }

  function getSavedLanguage() {
    try {
      return window.localStorage.getItem("pdfnest-language");
    } catch (error) {
      return null;
    }
  }

  function getBrowserLanguage() {
    const browserLanguage = (navigator.language || "").toLowerCase();

    if (browserLanguage.startsWith("fil") || browserLanguage.startsWith("tl")) return "tl";
    if (browserLanguage.startsWith("es")) return "es";
    if (browserLanguage.startsWith("id")) return "id";
    if (browserLanguage.startsWith("hi")) return "hi";
    if (browserLanguage.startsWith("ja")) return "ja";
    if (browserLanguage.startsWith("zh")) return "zh";
    if (browserLanguage.startsWith("ko")) return "ko";
    return "en";
  }

  function setLanguage(language, persist) {
    state.language = languageData[language] ? language : "en";

    if (persist) {
      try {
        window.localStorage.setItem("pdfnest-language", state.language);
      } catch (error) {
        // Local storage can be unavailable for file URLs in some browser settings.
      }
    }

    applyLanguage();
  }

  function initLanguage() {
    setLanguage(getSavedLanguage() || getBrowserLanguage(), false);
  }

  function getSavedRecentTools() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem("pdfnest-recent-tools") || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveRecentTools() {
    try {
      window.localStorage.setItem("pdfnest-recent-tools", JSON.stringify(state.recentToolIds));
    } catch (error) {
      // Local storage can be unavailable for file URLs in some browser settings.
    }
  }

  function initRecentTools() {
    state.recentToolIds = getSavedRecentTools()
      .map((toolId) => String(toolId || "").replace(/^#/, ""))
      .filter(isValidToolId)
      .filter((toolId, index, list) => toolId && list.indexOf(toolId) === index)
      .slice(0, 5);
    renderRecentTools();
  }

  function rememberRecentTool(toolId) {
    const activeId = String(toolId || "").replace(/^#/, "");

    if (!isValidToolId(activeId)) return;

    state.recentToolIds = [
      activeId,
      ...state.recentToolIds.filter((id) => id !== activeId)
    ].slice(0, 5);
    saveRecentTools();
    renderRecentTools();
  }

  function renderRecentTools() {
    if (!els.recentToolsBar || !els.recentToolsList) return;

    const shellText = getShellText();
    const recentIds = state.recentToolIds
      .map((toolId) => String(toolId || "").replace(/^#/, ""))
      .filter(isValidToolId)
      .filter((toolId, index, list) => toolId && list.indexOf(toolId) === index)
      .slice(0, 5);

    state.recentToolIds = recentIds;
    els.recentToolsLabel.textContent = shellText.recent;
    els.recentToolsList.innerHTML = "";
    els.toolsMenuRecentLabel.textContent = shellText.recent;
    els.toolsMenuRecentList.innerHTML = "";
    els.recentToolsBar.hidden = recentIds.length === 0;
    els.toolsMenuRecent.hidden = recentIds.length === 0;

    if (!recentIds.length) {
      return;
    }

    recentIds.forEach((toolId) => {
      const button = document.createElement("button");
      button.className = "recent-tool-button";
      button.type = "button";
      button.dataset.toolId = toolId;
      button.textContent = getToolTitle(toolId);
      els.recentToolsList.appendChild(button);

      const menuButton = button.cloneNode(true);
      menuButton.className = "recent-tool-button tools-menu-recent-button";
      els.toolsMenuRecentList.appendChild(menuButton);
    });
  }

  function hasPdfLib() {
    return Boolean(window.PDFLib && window.PDFLib.PDFDocument);
  }

  function hasPdfJs() {
    return Boolean(window.pdfjsLib && window.pdfjsLib.getDocument);
  }

  function hasZipLib() {
    return Boolean(window.JSZip);
  }

  if (hasPdfJs()) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "vendor/pdf.worker.min.js";
  }

  function formatBytes(bytes) {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
  }

  function sanitizeName(name) {
    return name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "document";
  }

  function setBusy(button, busyText) {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = busyText;

    return function clearBusy() {
      button.disabled = false;
      button.textContent = originalText;
    };
  }

  function showMessage(tool, text, type) {
    const messageType = type || "info";
    const role = messageType === "error" ? "alert" : "status";
    const live = messageType === "error" ? "assertive" : "polite";
    toolResults[tool].innerHTML = `<div class="message ${messageType}" role="${role}" aria-live="${live}">${escapeHtml(text)}</div>`;
  }

  function showProgress(tool, label, current, total, detail) {
    const safeTotal = Math.max(total || 1, 1);
    const percent = Math.max(0, Math.min(100, Math.round((current / safeTotal) * 100)));
    const detailText = detail ? `<div class="progress-detail">${escapeHtml(detail)}</div>` : "";

    toolResults[tool].innerHTML = `
      <div class="progress-panel" data-progress-panel role="status" aria-live="polite">
        <div class="progress-header">
          <span>${escapeHtml(label)}</span>
          <strong>${percent}%</strong>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-label="${escapeHtml(label)}">
          <span style="width: ${percent}%"></span>
        </div>
        ${detailText}
      </div>
    `;
  }

  function clearProgress(tool) {
    if (toolResults[tool].querySelector("[data-progress-panel]")) {
      toolResults[tool].innerHTML = "";
    }
  }

  function formatPdfError(prefix, error) {
    const issue = getPdfIssueMessage(error);
    const fileContext = error && error.fileName ? ` ${error.fileName}:` : "";

    if (issue) {
      return `${prefix}${fileContext} ${issue}`;
    }

    return `${prefix}${fileContext} ${error && error.message ? error.message : "Unexpected PDF error."}`;
  }

  function getPdfIssueMessage(error) {
    const name = error && error.name ? error.name : "";
    const message = error && error.message ? error.message : "";
    const haystack = `${name} ${message}`.toLowerCase();

    if (name === "PasswordCancelled") {
      return "A password is required to open this protected PDF.";
    }

    if (
      isPdfPasswordError(error)
      || name === "EncryptedPDFError"
      || haystack.includes("encrypted")
      || haystack.includes("password")
    ) {
      return "This PDF is encrypted or password-protected. Password prompts work for previews, page image export, and image extraction; editing tools need an unlocked PDF.";
    }

    if (haystack.includes("invalid pdf") || name === "InvalidPDFException") {
      return "This file does not look like a valid PDF.";
    }

    return "";
  }

  function addFileContext(error, file) {
    if (error && typeof error === "object" && file) {
      error.fileName = file.name;
    }

    return error;
  }

  function isPdfPasswordError(error) {
    const name = error && error.name ? error.name : "";
    const passwordResponses = window.pdfjsLib && window.pdfjsLib.PasswordResponses;

    return Boolean(
      name === "PasswordException"
      || (passwordResponses && (
        error.code === passwordResponses.NEED_PASSWORD
        || error.code === passwordResponses.INCORRECT_PASSWORD
      ))
    );
  }

  function isIncorrectPdfPasswordResponse(response) {
    const passwordResponses = window.pdfjsLib && window.pdfjsLib.PasswordResponses;
    return Boolean(passwordResponses && response === passwordResponses.INCORRECT_PASSWORD);
  }

  function revokeToolUrls(tool) {
    if (state.outputUrls[tool]) {
      state.outputUrls[tool].forEach((url) => {
        if (!isDownloadHistoryUrl(url)) {
          URL.revokeObjectURL(url);
        }
      });
    }

    state.outputUrls[tool] = [];
  }

  function createBlobUrl(bytes, type) {
    const blob = new Blob([bytes], { type });
    return {
      size: blob.size,
      url: URL.createObjectURL(blob)
    };
  }

  function setDownload(tool, bytes, filename, label, type) {
    revokeToolUrls(tool);

    const outputType = type || "application/pdf";
    const output = createBlobUrl(bytes, outputType);
    state.outputUrls[tool] = [output.url];
    addDownloadHistory({
      filename,
      label: label || "Download PDF",
      size: output.size,
      tool,
      type: outputType,
      url: output.url
    });

    toolResults[tool].innerHTML = `
      <div class="download-success" role="status" aria-live="polite">
        <div class="download-success-header">
          <span class="download-success-icon" aria-hidden="true">✓</span>
          <div>
            <strong>File created</strong>
            <span>${escapeHtml(filename)}</span>
          </div>
        </div>
        <div class="download-success-meta">
          <span>File size: ${formatBytes(output.size)}</span>
          <span>Added to History</span>
        </div>
        <a class="download-link" href="${escapeHtml(output.url)}" download="${escapeHtml(filename)}">
          ${escapeHtml(label || "Download PDF")}
        </a>
      </div>
    `;
  }

  function addDownloadHistory(item) {
    const historyItem = {
      createdAt: Date.now(),
      filename: item.filename,
      id: state.nextHistoryId,
      label: item.label,
      size: item.size,
      tool: item.tool,
      type: item.type,
      url: item.url
    };

    state.nextHistoryId += 1;
    state.downloadHistory.unshift(historyItem);

    while (state.downloadHistory.length > 10) {
      const removed = state.downloadHistory.pop();
      revokeHistoryUrl(removed.url);
    }

    renderDownloadHistory();
  }

  function renderDownloadHistory() {
    const language = getLanguage();
    const count = state.downloadHistory.length;
    const visibleItems = state.downloadHistory.slice(0, 3);
    els.downloadHistoryList.innerHTML = "";
    els.downloadHistoryList.classList.toggle("empty", count === 0);
    els.downloadHistoryClear.disabled = count === 0;
    els.downloadHistoryCount.textContent = count
      ? `${count} ${count === 1 ? language.history.file : language.history.files}`
      : language.history.noFiles;

    if (!count) {
      els.downloadHistoryList.innerHTML = `<li>${escapeHtml(language.history.noDownloads)}</li>`;
      return;
    }

    visibleItems.forEach((item) => {
      const row = document.createElement("li");
      row.className = "download-history-item";
      row.innerHTML = `
        <div>
          <div class="file-name">${escapeHtml(item.filename)}</div>
          <div class="file-meta">${escapeHtml(getToolLabel(item.tool))} - ${formatBytes(item.size)} - ${formatHistoryTime(item.createdAt)}</div>
        </div>
        <a class="download-history-link" href="${escapeHtml(item.url)}" download="${escapeHtml(item.filename)}">Download</a>
      `;
      els.downloadHistoryList.appendChild(row);
    });

    if (count > visibleItems.length) {
      const moreRow = document.createElement("li");
      moreRow.className = "download-history-more";
      moreRow.textContent = formatLanguageText(language.history.moreHidden, {
        count: count - visibleItems.length
      });
      els.downloadHistoryList.appendChild(moreRow);
    }
  }

  function formatHistoryTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function clearDownloadHistory() {
    state.downloadHistory.forEach((item) => revokeHistoryUrl(item.url));
    state.downloadHistory = [];
    renderDownloadHistory();
  }

  function revokeHistoryUrl(url) {
    if (!isActiveOutputUrl(url)) {
      URL.revokeObjectURL(url);
    }
  }

  function isDownloadHistoryUrl(url) {
    return state.downloadHistory.some((item) => item.url === url);
  }

  function isActiveOutputUrl(url) {
    return Object.values(state.outputUrls).some((urls) => urls.includes(url));
  }

  function showFileSizeWarning(tool, files, kind) {
    const warning = getFileSizeWarning(files, kind);

    if (warning) {
      showMessage(tool, warning, "warning");
    }
  }

  function getFileSizeWarning(files, kind) {
    const limit = largeFileLimits[kind] || largeFileLimits.document;
    const largeFiles = files.filter((file) => file && file.size > limit);

    if (!largeFiles.length) {
      return "";
    }

    if (largeFiles.length === 1) {
      const file = largeFiles[0];
      return `Large file warning: ${file.name} is ${formatBytes(file.size)}. Browser processing may be slower or fail on low-memory devices.`;
    }

    const largest = largeFiles.reduce((max, file) => file.size > max.size ? file : max, largeFiles[0]);
    return `Large file warning: ${largeFiles.length} files exceed ${formatBytes(limit)}. Largest file: ${largest.name} (${formatBytes(largest.size)}).`;
  }

  function initToolSearch() {
    const activeCategory = getActiveToolCategory();
    annotateToolSearchTargets();
    applyToolFilter(els.toolSearch.value, activeCategory);
  }

  function annotateToolSearchTargets() {
    toolCatalog.forEach((tool) => {
      const card = document.getElementById(tool.id);
      const navButton = document.querySelector(`.tools-nav-button[href="#${tool.id}"]`);
      const toolKey = getToolKeyFromCardId(tool.id);
      const menuBadge = getMenuBadge(toolKey);
      const menuDescription = getMenuDescription(toolKey);
      const aliases = toolSearchAliases[toolKey] || "";

      if (card) {
        const title = card.querySelector("h2") ? card.querySelector("h2").textContent : "";
        const chip = card.querySelector(".chip") ? card.querySelector(".chip").textContent : "";
        const copy = card.querySelector(".drop-copy") ? card.querySelector(".drop-copy").textContent : "";
        card.dataset.toolCategory = tool.category;
        card.dataset.toolSearch = normalizeSearchText(`${title} ${chip} ${copy} ${menuBadge} ${menuDescription} ${aliases} ${tool.keywords}`);
      }

      if (navButton) {
        navButton.dataset.toolCategory = tool.category;
        navButton.dataset.toolSearch = normalizeSearchText(`${navButton.textContent} ${menuBadge} ${menuDescription} ${aliases} ${tool.keywords}`);
      }
    });
  }

  function applyToolFilter(query, category) {
    const normalizedQuery = normalizeSearchText(query);
    const activeCategory = category || "all";
    let visibleCount = 0;

    toolCatalog.forEach((tool) => {
      const card = document.getElementById(tool.id);
      const navButton = document.querySelector(`.tools-nav-button[href="#${tool.id}"]`);
      const searchText = card ? card.dataset.toolSearch || "" : normalizeSearchText(tool.keywords);
      const categoryMatches = activeCategory === "all" || tool.category === activeCategory;
      const textMatches = !normalizedQuery || searchText.includes(normalizedQuery);
      const isVisible = categoryMatches && textMatches;
      const isHighlighted = isVisible && Boolean(normalizedQuery);

      if (navButton) {
        navButton.classList.toggle("is-tool-hidden", !isVisible);
        navButton.classList.toggle("is-tool-match", isHighlighted);
      }

      if (isVisible) {
        visibleCount += 1;
      }
    });

    document.querySelectorAll(".tools-nav-group").forEach((group) => {
      const hasVisibleButton = Boolean(group.querySelector(".tools-nav-button:not(.is-tool-hidden)"));
      group.classList.toggle("is-tool-hidden", !hasVisibleButton);
    });

    if (els.toolSearchEmpty) {
      els.toolSearchEmpty.hidden = visibleCount > 0;
    }
  }

  function getDefaultToolId() {
    return toolCatalog.length ? toolCatalog[0].id : "";
  }

  function getToolById(toolId) {
    return toolCatalog.find((tool) => tool.id === toolId);
  }

  function isValidToolId(toolId) {
    const normalizedId = String(toolId || "").replace(/^#/, "");
    return Boolean(getToolById(normalizedId) && document.getElementById(normalizedId));
  }

  function getValidToolId(toolId) {
    const normalizedId = String(toolId || "").replace(/^#/, "");
    return isValidToolId(normalizedId)
      ? normalizedId
      : getDefaultToolId();
  }

  function getToolTitle(toolId) {
    const card = document.getElementById(toolId);
    const title = card ? card.querySelector("h2") : null;
    return title ? title.textContent.trim() : "PDF tool";
  }

  function updateActiveToolNote(toolId) {
    if (!els.activeToolNote) return;

    const language = getLanguage();
    const tool = getToolById(toolId);
    const category = tool ? getCategoryLabel(tool.category) : "PDF tool";
    els.activeToolNote.textContent = formatLanguageText(language.activeNote, {
      category,
      tool: getToolTitle(toolId)
    });
  }

  function updateActiveToolSection(toolId) {
    const tool = getToolById(toolId);
    const activeCategory = tool ? tool.category : "";

    document.querySelectorAll(".tool-section-label").forEach((section) => {
      const isActive = section.dataset.toolCategory === activeCategory;
      section.classList.toggle("is-tool-hidden", !isActive);
      section.classList.toggle("is-active-tool-section", isActive);
    });
  }

  function focusActiveTool(toolId) {
    const card = document.getElementById(toolId);

    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    window.setTimeout(() => {
      card.focus({
        preventScroll: true
      });
    }, 160);
  }

  function setActiveTool(toolId, options) {
    const activeId = getValidToolId(toolId);

    if (!activeId) return;

    const shouldFocus = Boolean(options && options.focus);
    state.activeToolId = activeId;
    document.body.classList.add("single-tool-view");

    toolCatalog.forEach((tool) => {
      const card = document.getElementById(tool.id);
      const isActive = tool.id === activeId;

      if (!card) return;

      card.classList.toggle("is-active-tool", isActive);
      card.classList.toggle("is-inactive-tool", !isActive);

      if (isActive) {
        card.setAttribute("tabindex", "-1");
      } else {
        card.removeAttribute("tabindex");
      }
    });

    updateActiveToolSection(activeId);
    updateActiveToolNote(activeId);
    setCurrentTool(activeId);

    if (options && options.remember) {
      rememberRecentTool(activeId);
    }

    if (shouldFocus) {
      focusActiveTool(activeId);
    }
  }

  function openToolFromHome(toolId) {
    const activeId = getValidToolId(toolId);

    setActiveTool(activeId, {
      focus: true,
      remember: true
    });
    setToolsPanelOpen(false, false);

    if (window.location.hash !== `#${activeId}`) {
      window.location.hash = activeId;
    }
  }

  function setHomeUploadStatus(message, type) {
    if (!els.homeUploadStatus) return;

    els.homeUploadStatus.textContent = message || "";
    els.homeUploadStatus.classList.toggle("is-error", type === "error");
  }

  async function handleHomeUploadFiles(files) {
    const selectedFiles = Array.from(files || []);

    if (!selectedFiles.length) {
      setHomeUploadStatus("");
      return;
    }

    const pdfFiles = selectedFiles.filter(isPdfFile);
    const imageFiles = selectedFiles.filter(isImageFile);
    const hasUnsupported = pdfFiles.length + imageFiles.length !== selectedFiles.length;

    if (hasUnsupported || (pdfFiles.length && imageFiles.length)) {
      setHomeUploadStatus("Choose only PDF files or only JPG/PNG images for the quick upload area.", "error");
      return;
    }

    if (pdfFiles.length) {
      setHomeUploadStatus("Opening Merge PDF with your selected files...");
      openToolFromHome("merge-card");
      await setMergeFiles(pdfFiles);
      setHomeUploadStatus(`${pdfFiles.length} PDF file${pdfFiles.length === 1 ? "" : "s"} ready in Merge PDF.`);
      return;
    }

    if (imageFiles.length) {
      setHomeUploadStatus("Opening Image to PDF with your selected images...");
      openToolFromHome("image-card");
      state.imageFiles = imageFiles;
      els.imageResult.innerHTML = "";
      refreshList("image");
      showFileSizeWarning("image", state.imageFiles, "image");
      setHomeUploadStatus(`${imageFiles.length} image file${imageFiles.length === 1 ? "" : "s"} ready in Image to PDF.`);
      return;
    }

    setHomeUploadStatus("Choose PDF, JPG, or PNG files to start.", "error");
  }

  function setCurrentTool(toolId) {
    if (!toolId) return;

    document.querySelectorAll(".tools-nav-button").forEach((button) => {
      const isCurrent = button.getAttribute("href") === `#${toolId}`;
      button.classList.toggle("is-current-tool", isCurrent);

      if (isCurrent) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  function updateCurrentToolFromHash() {
    const toolId = window.location.hash ? window.location.hash.slice(1) : "";
    setActiveTool(toolId);
  }

  function initCurrentToolHighlight() {
    updateCurrentToolFromHash();
  }

  function normalizeSearchText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getActiveToolCategory() {
    const activeButton = els.toolCategoryFilters
      ? els.toolCategoryFilters.querySelector(".tool-category-button.is-active")
      : null;

    return activeButton ? activeButton.dataset.toolCategory : "all";
  }

  function setActiveToolCategory(category) {
    if (!els.toolCategoryFilters) return;

    els.toolCategoryFilters.querySelectorAll(".tool-category-button").forEach((button) => {
      const isActive = button.dataset.toolCategory === category;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setToolsPanelOpen(open, focusSearch) {
    els.toolNavPanel.hidden = !open;
    els.toolNavToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("tools-sheet-open", Boolean(open));

    if (open) {
      setHistoryPanelOpen(false);
      setSettingsPanelOpen(false);
    }

    const icon = els.toolNavToggle.querySelector(".tools-nav-toggle-icon");

    if (icon) {
      icon.textContent = "v";
    }

    if (open && focusSearch) {
      els.toolSearch.focus();
    }
  }

  function toggleToolsPanel() {
    setToolsPanelOpen(els.toolNavPanel.hidden, true);
  }

  function setHistoryPanelOpen(open) {
    if (!els.downloadHistoryPanel) return;

    els.downloadHistoryPanel.open = Boolean(open);
  }

  function setSettingsPanelOpen(open) {
    if (!els.settingsPanel) return;

    els.settingsPanel.open = Boolean(open);
  }

  function getOrderedFiles(type) {
    if (type === "merge") return state.mergeFiles;
    if (type === "image") return state.imageFiles;
    if (type === "spreadsheet") return state.spreadsheetFiles;
    if (type === "word") return state.wordFiles;
    if (type === "text") return state.textFiles;
    return [];
  }

  function getEmptyFileLabel(type) {
    if (type === "merge") return "PDF";
    if (type === "image") return "image";
    if (type === "spreadsheet") return "spreadsheet";
    if (type === "word") return "Word";
    if (type === "text") return "text";
    return "file";
  }

  function renderOrderedList(listElement, files, type) {
    listElement.innerHTML = "";
    listElement.classList.toggle("empty", files.length === 0);

    if (!files.length) {
      listElement.innerHTML = `<li>No ${getEmptyFileLabel(type)} files selected.</li>`;
      return;
    }

    files.forEach((file, index) => {
      const row = document.createElement("li");
      row.className = "file-row";
      row.draggable = true;
      row.dataset.index = String(index);
      row.dataset.type = type;

      const handle = document.createElement("button");
      handle.type = "button";
      handle.className = "drag-handle";
      handle.textContent = "::";
      handle.title = "Drag to reorder";
      handle.setAttribute("aria-label", `Drag ${file.name} to reorder`);

      const detail = document.createElement("div");
      detail.innerHTML = `
        <div class="file-name">${index + 1}. ${escapeHtml(file.name)}</div>
        <div class="file-meta">${formatBytes(file.size)}</div>
      `;

      const actions = document.createElement("div");
      actions.className = "file-actions";

      const upButton = makeListButton("Up", "^", index === 0, () => moveFile(type, index, index - 1));
      const downButton = makeListButton("Down", "v", index === files.length - 1, () => moveFile(type, index, index + 1));
      const removeButton = makeListButton("Remove", "x", false, () => removeFile(type, index));

      actions.append(upButton, downButton, removeButton);
      setupSortableRow(row, type, index);
      row.append(handle, detail, actions);
      listElement.appendChild(row);
    });
  }

  function makeListButton(label, text, disabled, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-button";
    button.textContent = text;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.disabled = disabled;
    button.addEventListener("click", onClick);
    return button;
  }

  function moveFile(type, from, to) {
    const collection = getOrderedFiles(type);
    const [file] = collection.splice(from, 1);
    collection.splice(to, 0, file);

    if (type === "merge") {
      reorderMergePagesByFileOrder();
    }

    refreshList(type);
  }

  function setupSortableRow(row, type, index) {
    row.addEventListener("dragstart", (event) => {
      state.drag = { type, index };
      row.classList.add("is-dragging");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", `${type}:${index}`);
      }
    });

    row.addEventListener("dragend", () => {
      row.classList.remove("is-dragging");
      state.drag = null;
      clearDragOverRows();
    });

    row.addEventListener("dragover", (event) => {
      if (!state.drag || state.drag.type !== type) return;
      event.preventDefault();
      row.classList.add("is-drag-over");

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
    });

    row.addEventListener("dragleave", () => {
      row.classList.remove("is-drag-over");
    });

    row.addEventListener("drop", (event) => {
      event.preventDefault();

      if (!state.drag || state.drag.type !== type || state.drag.index === index) {
        row.classList.remove("is-drag-over");
        return;
      }

      moveFile(type, state.drag.index, index);
      state.drag = null;
      clearDragOverRows();
    });
  }

  function clearDragOverRows() {
    document.querySelectorAll(".file-row.is-drag-over").forEach((row) => {
      row.classList.remove("is-drag-over");
    });
  }

  function removeFile(type, index) {
    const collection = getOrderedFiles(type);
    const [removedFile] = collection.splice(index, 1);

    if (type === "merge" && removedFile) {
      const removedFileId = getFileId(removedFile);
      state.mergePages = state.mergePages.filter((page) => page.fileId !== removedFileId);
    }

    refreshList(type);
  }

  function refreshList(type) {
    if (type === "merge") {
      renderOrderedList(els.mergeList, state.mergeFiles, "merge");
      updateMergePreview();
      updateMergeSummary();
    } else if (type === "image") {
      renderOrderedList(els.imageList, state.imageFiles, "image");
      updateImageSummary();
    } else if (type === "spreadsheet") {
      renderOrderedList(els.spreadsheetList, state.spreadsheetFiles, "spreadsheet");
      updateSpreadsheetSummary();
    } else if (type === "word") {
      renderOrderedList(els.wordList, state.wordFiles, "word");
      updateWordSummary();
    } else if (type === "text") {
      renderOrderedList(els.textList, state.textFiles, "text");
      updateTextSummary();
    } else if (type === "compress") {
      renderCompressFile();
      updateCompressSummary();
    } else if (type === "watermark") {
      renderWatermarkFile();
      updateWatermarkSummary();
    } else if (type === "pageNumbers") {
      renderPageNumberFile();
      updatePageNumberSummary();
    } else if (type === "signature") {
      renderSignatureFile();
      updateSignatureSummary();
    } else if (type === "metadata") {
      renderMetadataFile();
      updateMetadataSummary();
    } else if (type === "annotate") {
      renderAnnotateFile();
      updateAnnotateSummary();
    } else if (type === "flatten") {
      renderFlattenFile();
      updateFlattenSummary();
    } else if (type === "crop") {
      renderCropFile();
      updateCropSummary();
    } else if (type === "addText") {
      renderAddTextFile();
      updateAddTextSummary();
    } else if (type === "removePassword") {
      renderRemovePasswordFile();
      updateRemovePasswordSummary();
    } else if (type === "pdfImage") {
      renderPdfImageFile();
      updatePdfImageSummary();
    } else if (type === "pdfExtract") {
      renderPdfExtractFile();
      updatePdfExtractSummary();
    } else if (type === "pdfText") {
      renderPdfTextFile();
      updatePdfTextSummary();
    } else {
      renderSplitFile();
      updateSplitPreview();
      updateSplitSummary();
    }
  }

  function reorderMergePagesByFileOrder() {
    const pagesByFile = new Map();

    state.mergePages.forEach((page) => {
      if (!pagesByFile.has(page.fileId)) {
        pagesByFile.set(page.fileId, []);
      }

      pagesByFile.get(page.fileId).push(page);
    });

    state.mergePages = state.mergeFiles.flatMap((file) => {
      return pagesByFile.get(getFileId(file)) || [];
    });
  }

  function renderSplitFile() {
    els.splitList.innerHTML = "";
    els.splitList.classList.toggle("empty", !state.splitFile);

    if (!state.splitFile) {
      els.splitList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.splitFile.name)}</div>
        <div class="file-meta">${formatBytes(state.splitFile.size)}</div>
      </div>
    `;
    els.splitList.appendChild(row);
  }

  function renderCompressFile() {
    els.compressList.innerHTML = "";
    els.compressList.classList.toggle("empty", !state.compressFile);

    if (!state.compressFile) {
      els.compressList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.compressFile.name)}</div>
        <div class="file-meta">${formatBytes(state.compressFile.size)}</div>
      </div>
    `;
    els.compressList.appendChild(row);
  }

  function renderWatermarkFile() {
    els.watermarkList.innerHTML = "";
    els.watermarkList.classList.toggle("empty", !state.watermarkFile);

    if (!state.watermarkFile) {
      els.watermarkList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.watermarkFile.name)}</div>
        <div class="file-meta">${formatBytes(state.watermarkFile.size)}</div>
      </div>
    `;
    els.watermarkList.appendChild(row);
  }

  function renderPageNumberFile() {
    els.pageNumberList.innerHTML = "";
    els.pageNumberList.classList.toggle("empty", !state.pageNumberFile);

    if (!state.pageNumberFile) {
      els.pageNumberList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.pageNumberFile.name)}</div>
        <div class="file-meta">${formatBytes(state.pageNumberFile.size)}</div>
      </div>
    `;
    els.pageNumberList.appendChild(row);
  }

  function renderSignatureFile() {
    els.signatureList.innerHTML = "";
    els.signatureList.classList.toggle("empty", !state.signatureFile);

    if (!state.signatureFile) {
      els.signatureList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.signatureFile.name)}</div>
        <div class="file-meta">${formatBytes(state.signatureFile.size)}</div>
      </div>
    `;
    els.signatureList.appendChild(row);
  }

  function renderMetadataFile() {
    els.metadataList.innerHTML = "";
    els.metadataList.classList.toggle("empty", !state.metadataFile);

    if (!state.metadataFile) {
      els.metadataList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.metadataFile.name)}</div>
        <div class="file-meta">${formatBytes(state.metadataFile.size)}</div>
      </div>
    `;
    els.metadataList.appendChild(row);
  }

  function renderAnnotateFile() {
    els.annotateList.innerHTML = "";
    els.annotateList.classList.toggle("empty", !state.annotateFile);

    if (!state.annotateFile) {
      els.annotateList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.annotateFile.name)}</div>
        <div class="file-meta">${formatBytes(state.annotateFile.size)}</div>
      </div>
    `;
    els.annotateList.appendChild(row);
  }

  function renderFlattenFile() {
    els.flattenList.innerHTML = "";
    els.flattenList.classList.toggle("empty", !state.flattenFile);

    if (!state.flattenFile) {
      els.flattenList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.flattenFile.name)}</div>
        <div class="file-meta">${formatBytes(state.flattenFile.size)}</div>
      </div>
    `;
    els.flattenList.appendChild(row);
  }

  function renderCropFile() {
    els.cropList.innerHTML = "";
    els.cropList.classList.toggle("empty", !state.cropFile);

    if (!state.cropFile) {
      els.cropList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.cropFile.name)}</div>
        <div class="file-meta">${formatBytes(state.cropFile.size)}</div>
      </div>
    `;
    els.cropList.appendChild(row);
  }

  function renderAddTextFile() {
    els.addTextList.innerHTML = "";
    els.addTextList.classList.toggle("empty", !state.addTextFile);

    if (!state.addTextFile) {
      els.addTextList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.addTextFile.name)}</div>
        <div class="file-meta">${formatBytes(state.addTextFile.size)}</div>
      </div>
    `;
    els.addTextList.appendChild(row);
  }

  function renderRemovePasswordFile() {
    els.removePasswordList.innerHTML = "";
    els.removePasswordList.classList.toggle("empty", !state.removePasswordFile);

    if (!state.removePasswordFile) {
      els.removePasswordList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.removePasswordFile.name)}</div>
        <div class="file-meta">${formatBytes(state.removePasswordFile.size)}</div>
      </div>
    `;
    els.removePasswordList.appendChild(row);
  }

  function renderPdfImageFile() {
    els.pdfImageList.innerHTML = "";
    els.pdfImageList.classList.toggle("empty", !state.pdfImageFile);

    if (!state.pdfImageFile) {
      els.pdfImageList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.pdfImageFile.name)}</div>
        <div class="file-meta">${formatBytes(state.pdfImageFile.size)}</div>
      </div>
    `;
    els.pdfImageList.appendChild(row);
  }

  function renderPdfExtractFile() {
    els.pdfExtractList.innerHTML = "";
    els.pdfExtractList.classList.toggle("empty", !state.pdfExtractFile);

    if (!state.pdfExtractFile) {
      els.pdfExtractList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.pdfExtractFile.name)}</div>
        <div class="file-meta">${formatBytes(state.pdfExtractFile.size)}</div>
      </div>
    `;
    els.pdfExtractList.appendChild(row);
  }

  function renderPdfTextFile() {
    els.pdfTextList.innerHTML = "";
    els.pdfTextList.classList.toggle("empty", !state.pdfTextFile);

    if (!state.pdfTextFile) {
      els.pdfTextList.innerHTML = "<li>No PDF file selected.</li>";
      return;
    }

    const row = document.createElement("li");
    row.className = "file-row split-file-row";
    row.innerHTML = `
      <div>
        <div class="file-name">${escapeHtml(state.pdfTextFile.name)}</div>
        <div class="file-meta">${formatBytes(state.pdfTextFile.size)}</div>
      </div>
    `;
    els.pdfTextList.appendChild(row);
  }

  function updateMergeSummary() {
    const fileCount = state.mergeFiles.length;
    const pageCount = state.mergePages.length;
    els.mergeSummary.textContent = fileCount
      ? `${fileCount} PDF${fileCount === 1 ? "" : "s"}, ${pageCount} page${pageCount === 1 ? "" : "s"} ready to merge.`
      : "No pages ready to merge.";
  }

  function updateSplitSummary() {
    const pageCount = state.splitPages.length;
    els.splitSummary.textContent = state.splitFile
      ? `${pageCount} editable page${pageCount === 1 ? "" : "s"} ready to split.`
      : "No pages ready to split.";
  }

  function updateCompressSummary() {
    els.compressSummary.textContent = state.compressFile
      ? `${state.compressFile.name} selected, ${formatBytes(state.compressFile.size)} original size.`
      : "No PDF selected for compression.";
  }

  function updateWatermarkSummary() {
    els.watermarkSummary.textContent = state.watermarkFile
      ? `${state.watermarkFile.name} selected, ${formatBytes(state.watermarkFile.size)} original size.`
      : "No PDF selected for watermarking.";
  }

  function updatePageNumberSummary() {
    els.pageNumberSummary.textContent = state.pageNumberFile
      ? `${state.pageNumberFile.name} selected, ${formatBytes(state.pageNumberFile.size)} original size.`
      : "No PDF selected for page numbers.";
  }

  function updateSignatureSummary() {
    els.signatureSummary.textContent = state.signatureFile
      ? `${state.signatureFile.name} selected, ${formatBytes(state.signatureFile.size)} original size.`
      : "No PDF selected for signing.";
  }

  function updateMetadataSummary() {
    els.metadataSummary.textContent = state.metadataFile
      ? `${state.metadataFile.name} selected, ${formatBytes(state.metadataFile.size)} original size.`
      : "No PDF selected for metadata editing.";
  }

  function updateAnnotateSummary() {
    els.annotateSummary.textContent = state.annotateFile
      ? `${state.annotateFile.name} selected, ${formatBytes(state.annotateFile.size)} original size.`
      : "No PDF selected for annotation.";
  }

  function updateFlattenSummary() {
    els.flattenSummary.textContent = state.flattenFile
      ? `${state.flattenFile.name} selected, ${formatBytes(state.flattenFile.size)} original size.`
      : "No PDF selected for flattening.";
  }

  function updateCropSummary() {
    els.cropSummary.textContent = state.cropFile
      ? `${state.cropFile.name} selected, ${formatBytes(state.cropFile.size)} original size.`
      : "No PDF selected for cropping.";
  }

  function updateAddTextSummary() {
    els.addTextSummary.textContent = state.addTextFile
      ? `${state.addTextFile.name} selected, ${formatBytes(state.addTextFile.size)} original size.`
      : "No PDF selected for text filling.";
  }

  function updateRemovePasswordSummary() {
    els.removePasswordSummary.textContent = state.removePasswordFile
      ? `${state.removePasswordFile.name} selected, ${formatBytes(state.removePasswordFile.size)} original size.`
      : "No PDF selected for password removal.";
  }

  function updateImageSummary() {
    const imageCount = state.imageFiles.length;
    els.imageSummary.textContent = imageCount
      ? `${imageCount} image${imageCount === 1 ? "" : "s"} ready to convert.`
      : "No images ready to convert.";
  }

  function updateSpreadsheetSummary() {
    const fileCount = state.spreadsheetFiles.length;
    els.spreadsheetSummary.textContent = fileCount
      ? `${fileCount} spreadsheet file${fileCount === 1 ? "" : "s"} ready to convert.`
      : "No spreadsheets ready to convert.";
  }

  function updateWordSummary() {
    const fileCount = state.wordFiles.length;
    els.wordSummary.textContent = fileCount
      ? `${fileCount} Word file${fileCount === 1 ? "" : "s"} ready to convert.`
      : "No Word files ready to convert.";
  }

  function updateTextSummary() {
    const fileCount = state.textFiles.length;
    els.textSummary.textContent = fileCount
      ? `${fileCount} text file${fileCount === 1 ? "" : "s"} ready to convert.`
      : "No text files ready to convert.";
  }

  function updatePdfImageSummary() {
    els.pdfImageSummary.textContent = state.pdfImageFile
      ? `${state.pdfImageFile.name} selected, ${formatBytes(state.pdfImageFile.size)} original size.`
      : "No PDF selected for image export.";
  }

  function updatePdfExtractSummary() {
    els.pdfExtractSummary.textContent = state.pdfExtractFile
      ? `${state.pdfExtractFile.name} selected, ${formatBytes(state.pdfExtractFile.size)} original size.`
      : "No PDF selected for image extraction.";
  }

  function updatePdfTextSummary() {
    els.pdfTextSummary.textContent = state.pdfTextFile
      ? `${state.pdfTextFile.name} selected, ${formatBytes(state.pdfTextFile.size)} original size.`
      : "No PDF selected for text extraction.";
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readSelectedFiles(input) {
    return Array.from(input.files || []);
  }

  function isPdfFile(file) {
    return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  }

  function isImageFile(file) {
    const name = file.name.toLowerCase();
    return file.type === "image/png"
      || file.type === "image/jpeg"
      || name.endsWith(".png")
      || name.endsWith(".jpg")
      || name.endsWith(".jpeg");
  }

  function isSpreadsheetFile(file) {
    return isXlsxFile(file) || isCsvFile(file);
  }

  function isDocxFile(file) {
    return file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      || file.name.toLowerCase().endsWith(".docx");
  }

  function isTextFile(file) {
    return file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt");
  }

  function isXlsxFile(file) {
    const name = file.name.toLowerCase();
    return file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      || name.endsWith(".xlsx");
  }

  function isCsvFile(file) {
    const name = file.name.toLowerCase();
    return file.type === "text/csv"
      || file.type === "application/csv"
      || name.endsWith(".csv");
  }

  function getFileId(file) {
    if (!state.fileIds.has(file)) {
      state.fileIds.set(file, state.nextFileId);
      state.nextFileId += 1;
    }

    return state.fileIds.get(file);
  }

  function getStoredPdfPassword(file) {
    return state.pdfPasswords.get(getFileId(file));
  }

  function rememberPdfPassword(file, password) {
    if (password) {
      state.pdfPasswords.set(getFileId(file), password);
    }
  }

  function forgetPdfPassword(file) {
    state.pdfPasswords.delete(getFileId(file));
  }

  async function loadPdfJsDocument(file, reason) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const storedPassword = getStoredPdfPassword(file);
    const loadingTask = window.pdfjsLib.getDocument({
      data: bytes.slice(),
      password: storedPassword || undefined
    });
    let cancelled = false;

    loadingTask.onPassword = async (updatePassword, response) => {
      const password = await requestPdfPassword(
        file,
        reason,
        isIncorrectPdfPasswordResponse(response)
      );

      if (password === null) {
        cancelled = true;
        forgetPdfPassword(file);

        if (loadingTask.destroy) {
          loadingTask.destroy();
        }

        return;
      }

      rememberPdfPassword(file, password);
      updatePassword(password);
    };

    try {
      return await loadingTask.promise;
    } catch (error) {
      if (cancelled) {
        const cancelError = new Error("Password is required to open this protected PDF.");
        cancelError.name = "PasswordCancelled";
        throw addFileContext(cancelError, file);
      }

      throw addFileContext(error, file);
    }
  }

  function requestPdfPassword(file, reason, incorrect) {
    if (!els.pdfPasswordDialog || !els.pdfPasswordForm || !els.pdfPasswordInput) {
      return Promise.resolve(null);
    }

    if (state.pendingPasswordRequest) {
      state.pendingPasswordRequest.resolve(null);
    }

    return new Promise((resolve) => {
      state.pendingPasswordRequest = {
        file,
        previousFocus: document.activeElement,
        resolve
      };
      els.pdfPasswordTitle.textContent = "Enter PDF password";
      els.pdfPasswordMessage.textContent = `"${file.name}" is password-protected. Enter the password to ${reason}.`;
      els.pdfPasswordInput.value = "";
      els.pdfPasswordSubmit.textContent = "Unlock";
      els.pdfPasswordError.textContent = incorrect
        ? "That password did not work. Try again."
        : "";
      els.pdfPasswordError.hidden = !incorrect;
      els.pdfPasswordDialog.hidden = false;
      updateModalOpenState();
      window.setTimeout(() => els.pdfPasswordInput.focus(), 0);
    });
  }

  function submitPdfPassword(event) {
    event.preventDefault();

    const pending = state.pendingPasswordRequest;
    if (!pending) return;

    const password = els.pdfPasswordInput.value;
    rememberPdfPassword(pending.file, password);
    closePdfPasswordDialog();
    pending.resolve(password);
  }

  function cancelPdfPasswordRequest() {
    const pending = state.pendingPasswordRequest;
    if (!pending) return;

    forgetPdfPassword(pending.file);
    closePdfPasswordDialog();
    pending.resolve(null);
  }

  function closePdfPasswordDialog() {
    const pending = state.pendingPasswordRequest;
    state.pendingPasswordRequest = null;
    els.pdfPasswordDialog.hidden = true;
    els.pdfPasswordInput.value = "";
    els.pdfPasswordError.hidden = true;
    els.pdfPasswordError.textContent = "";
    updateModalOpenState();

    if (pending && pending.previousFocus && pending.previousFocus.focus) {
      pending.previousFocus.focus();
    }
  }

  function updateModalOpenState() {
    const passwordOpen = els.pdfPasswordDialog && !els.pdfPasswordDialog.hidden;
    const signerOpen = els.signatureFullModal && !els.signatureFullModal.hidden;
    document.body.classList.toggle("modal-open", Boolean(passwordOpen || signerOpen));
  }

  function createPageEntry(file, pageIndex) {
    const fileId = getFileId(file);

    return {
      file,
      fileId,
      id: `${fileId}-${pageIndex}-${Math.random().toString(36).slice(2)}`,
      pageIndex,
      rotation: 0
    };
  }

  async function buildPagePlan(files, type, onProgress) {
    if (!files.length) {
      return [];
    }

    if (!hasPdfJs()) {
      showMessage(type, "The local PDF preview library did not load, so page editing is unavailable.", "error");
      return [];
    }

    const entries = [];

    for (const [fileIndex, file] of files.entries()) {
      if (onProgress) {
        onProgress(fileIndex, files.length, `Reading ${file.name}`);
      }

      let pdf;

      try {
        pdf = await loadPdfJsDocument(file, "read its page count");
      } catch (error) {
        throw addFileContext(error, file);
      }

      for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex += 1) {
        entries.push(createPageEntry(file, pageIndex));
      }

      pdf.destroy();

      if (onProgress) {
        onProgress(fileIndex + 1, files.length, `Loaded ${file.name}`);
      }
    }

    return entries;
  }

  async function setMergeFiles(files) {
    const run = ++state.planRuns.merge;
    state.mergeFiles = files;
    state.mergePages = [];
    els.mergeResult.innerHTML = "";
    renderOrderedList(els.mergeList, state.mergeFiles, "merge");
    els.mergeSummary.textContent = files.length ? "Loading PDF page counts..." : "No pages ready to merge.";
    if (files.length) {
      showProgress("merge", "Reading PDF page counts", 0, files.length, "Preparing editable page list");
    }
    updateMergePreview();

    let pages = [];
    let readError = false;

    try {
      pages = await buildPagePlan(files, "merge", (current, total, detail) => {
        showProgress("merge", "Reading PDF page counts", current, total, detail);
      });
    } catch (error) {
      readError = true;
      showMessage("merge", formatPdfError("Could not read PDF page counts.", error), "error");
    }

    if (run !== state.planRuns.merge) return;

    state.mergePages = pages;
    refreshList("merge");

    if (!readError) {
      showFileSizeWarning("merge", files, "pdf");
    }
  }

  async function setSplitFile(file) {
    const run = ++state.planRuns.split;
    state.splitFile = file;
    state.splitPages = [];
    els.splitResult.innerHTML = "";
    renderSplitFile();
    els.splitSummary.textContent = file ? "Loading PDF page count..." : "No pages ready to split.";
    if (file) {
      showProgress("split", "Reading PDF page count", 0, 1, file.name);
    }
    updateSplitPreview();

    let pages = [];
    let readError = false;

    try {
      pages = await buildPagePlan(file ? [file] : [], "split", (current, total, detail) => {
        showProgress("split", "Reading PDF page count", current, total, detail);
      });
    } catch (error) {
      readError = true;
      showMessage("split", formatPdfError("Could not read PDF page count.", error), "error");
    }

    if (run !== state.planRuns.split) return;

    state.splitPages = pages;
    refreshList("split");

    if (!readError && file) {
      showFileSizeWarning("split", [file], "pdf");
    }
  }

  function setCompressFile(file) {
    state.compressFile = file;
    revokeToolUrls("compress");
    els.compressResult.innerHTML = "";
    refreshList("compress");
    showFileSizeWarning("compress", file ? [file] : [], "pdf");
  }

  function setWatermarkFile(file) {
    state.watermarkFile = file;
    revokeToolUrls("watermark");
    els.watermarkResult.innerHTML = "";
    refreshList("watermark");
    showFileSizeWarning("watermark", file ? [file] : [], "pdf");
  }

  function setPageNumberFile(file) {
    state.pageNumberFile = file;
    revokeToolUrls("pageNumbers");
    els.pageNumberResult.innerHTML = "";
    refreshList("pageNumbers");
    showFileSizeWarning("pageNumbers", file ? [file] : [], "pdf");
  }

  function setSignatureFile(file) {
    closeSignatureFullView();
    clearSignatureFullDrawing(true);
    state.signatureFullPageCount = 0;
    state.signatureFile = file;
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
    refreshList("signature");
    showFileSizeWarning("signature", file ? [file] : [], "pdf");
  }

  function setMetadataFile(file) {
    state.metadataFile = file;
    revokeToolUrls("metadata");
    els.metadataResult.innerHTML = "";
    refreshList("metadata");
    showFileSizeWarning("metadata", file ? [file] : [], "pdf");
  }

  function setAnnotateFile(file) {
    state.annotateFile = file;
    revokeToolUrls("annotate");
    els.annotateResult.innerHTML = "";
    refreshList("annotate");
    showFileSizeWarning("annotate", file ? [file] : [], "pdf");
  }

  function setFlattenFile(file) {
    state.flattenFile = file;
    revokeToolUrls("flatten");
    els.flattenResult.innerHTML = "";
    refreshList("flatten");
    showFileSizeWarning("flatten", file ? [file] : [], "pdf");
  }

  function setCropFile(file) {
    state.cropFile = file;
    revokeToolUrls("crop");
    els.cropResult.innerHTML = "";
    refreshList("crop");
    showFileSizeWarning("crop", file ? [file] : [], "pdf");
  }

  function setAddTextFile(file) {
    state.addTextFile = file;
    revokeToolUrls("addText");
    els.addTextResult.innerHTML = "";
    refreshList("addText");
    showFileSizeWarning("addText", file ? [file] : [], "pdf");
  }

  function setRemovePasswordFile(file) {
    state.removePasswordFile = file;
    revokeToolUrls("removePassword");
    els.removePasswordResult.innerHTML = "";
    refreshList("removePassword");
    showFileSizeWarning("removePassword", file ? [file] : [], "pdf");
  }

  function setPdfImageFile(file) {
    state.pdfImageFile = file;
    revokeToolUrls("pdfImage");
    els.pdfImageResult.innerHTML = "";
    refreshList("pdfImage");
    showFileSizeWarning("pdfImage", file ? [file] : [], "pdf");
  }

  function setPdfExtractFile(file) {
    state.pdfExtractFile = file;
    revokeToolUrls("pdfExtract");
    els.pdfExtractResult.innerHTML = "";
    refreshList("pdfExtract");
    showFileSizeWarning("pdfExtract", file ? [file] : [], "pdf");
  }

  function setPdfTextFile(file) {
    state.pdfTextFile = file;
    revokeToolUrls("pdfText");
    els.pdfTextResult.innerHTML = "";
    refreshList("pdfText");
    showFileSizeWarning("pdfText", file ? [file] : [], "pdf");
  }

  function clearTool(type) {
    revokeToolUrls(type);

    if (type === "merge") {
      state.planRuns.merge += 1;
      state.previewRuns.merge += 1;
      state.mergeFiles = [];
      state.mergePages = [];
      els.mergeFiles.value = "";
      els.mergeResult.innerHTML = "";
      refreshList("merge");
      return;
    }

    if (type === "split") {
      state.planRuns.split += 1;
      state.previewRuns.split += 1;
      state.splitFile = null;
      state.splitPages = [];
      els.splitFile.value = "";
      els.splitResult.innerHTML = "";
      refreshList("split");
      return;
    }

    if (type === "compress") {
      state.compressFile = null;
      els.compressFile.value = "";
      els.compressResult.innerHTML = "";
      refreshList("compress");
      return;
    }

    if (type === "watermark") {
      state.watermarkFile = null;
      els.watermarkFile.value = "";
      els.watermarkResult.innerHTML = "";
      refreshList("watermark");
      return;
    }

    if (type === "pageNumbers") {
      state.pageNumberFile = null;
      els.pageNumberFile.value = "";
      els.pageNumberResult.innerHTML = "";
      refreshList("pageNumbers");
      return;
    }

    if (type === "signature") {
      closeSignatureFullView();
      clearSignatureFullDrawing(true);
      state.signatureFullPageCount = 0;
      state.signatureFile = null;
      els.signatureFile.value = "";
      els.signatureResult.innerHTML = "";
      refreshList("signature");
      return;
    }

    if (type === "metadata") {
      state.metadataFile = null;
      els.metadataFile.value = "";
      els.metadataResult.innerHTML = "";
      refreshList("metadata");
      return;
    }

    if (type === "annotate") {
      state.annotateFile = null;
      els.annotateFile.value = "";
      els.annotateResult.innerHTML = "";
      clearAnnotationPad();
      refreshList("annotate");
      return;
    }

    if (type === "flatten") {
      state.flattenFile = null;
      els.flattenFile.value = "";
      els.flattenResult.innerHTML = "";
      refreshList("flatten");
      return;
    }

    if (type === "crop") {
      state.cropFile = null;
      els.cropFile.value = "";
      els.cropResult.innerHTML = "";
      refreshList("crop");
      return;
    }

    if (type === "addText") {
      state.addTextFile = null;
      els.addTextFile.value = "";
      els.addTextResult.innerHTML = "";
      refreshList("addText");
      return;
    }

    if (type === "removePassword") {
      state.removePasswordFile = null;
      els.removePasswordFile.value = "";
      els.removePasswordResult.innerHTML = "";
      refreshList("removePassword");
      return;
    }

    if (type === "image") {
      state.imageFiles = [];
      els.imageFiles.value = "";
      els.imageResult.innerHTML = "";
      refreshList("image");
      return;
    }

    if (type === "spreadsheet") {
      state.spreadsheetFiles = [];
      els.spreadsheetFiles.value = "";
      els.spreadsheetResult.innerHTML = "";
      refreshList("spreadsheet");
      return;
    }

    if (type === "word") {
      state.wordFiles = [];
      els.wordFiles.value = "";
      els.wordResult.innerHTML = "";
      refreshList("word");
      return;
    }

    if (type === "text") {
      state.textFiles = [];
      els.textFiles.value = "";
      els.textResult.innerHTML = "";
      refreshList("text");
      return;
    }

    if (type === "pdfImage") {
      state.pdfImageFile = null;
      els.pdfImageFile.value = "";
      els.pdfImageResult.innerHTML = "";
      refreshList("pdfImage");
      return;
    }

    if (type === "pdfExtract") {
      state.pdfExtractFile = null;
      els.pdfExtractFile.value = "";
      els.pdfExtractResult.innerHTML = "";
      refreshList("pdfExtract");
      return;
    }

    if (type === "pdfText") {
      state.pdfTextFile = null;
      els.pdfTextFile.value = "";
      els.pdfTextResult.innerHTML = "";
      refreshList("pdfText");
    }
  }

  function setupDropZone(input, options) {
    const zone = input.closest(".drop-zone");

    if (!zone) return;

    let dragDepth = 0;

    zone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      dragDepth += 1;
      zone.classList.add("is-dragging");
    });

    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-dragging");
    });

    zone.addEventListener("dragleave", () => {
      dragDepth -= 1;

      if (dragDepth <= 0) {
        dragDepth = 0;
        zone.classList.remove("is-dragging");
      }
    });

    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      dragDepth = 0;
      zone.classList.remove("is-dragging");

      const droppedFiles = Array.from(event.dataTransfer.files || []);
      const validFiles = droppedFiles.filter(options.accepts);

      if (!validFiles.length) {
        showMessage(options.tool, options.emptyMessage, "error");
        return;
      }

      options.onFiles(options.multiple ? validFiles : [validFiles[0]], droppedFiles.length - validFiles.length);
    });
  }

  function updateMergePreview() {
    renderPagePlanPreview({
      container: els.mergePreview,
      pages: state.mergePages,
      run: ++state.previewRuns.merge,
      section: els.mergePreviewSection,
      thumbnailWidth: 150,
      type: "merge"
    });
  }

  function updateSplitPreview() {
    renderPagePlanPreview({
      container: els.splitPreview,
      pages: state.splitPages,
      run: ++state.previewRuns.split,
      section: els.splitPreviewSection,
      thumbnailWidth: 130,
      type: "split"
    });
  }

  async function renderPagePlanPreview(options) {
    const { container, pages, run, section, thumbnailWidth, type } = options;

    if (!pages.length) {
      container.innerHTML = "";
      section.hidden = true;
      return;
    }

    section.hidden = false;

    if (!hasPdfJs()) {
      container.innerHTML = "";
      appendPreviewNote(container, "Page previews are unavailable because the local PDF preview library did not load.");
      return;
    }

    container.innerHTML = "";
    appendPreviewNote(container, "Rendering editable page previews...");

    const pdfCache = new Map();

    try {
      container.innerHTML = "";

      for (const [planIndex, entry] of pages.entries()) {
        if (state.previewRuns[type] !== run) return;

        const pdf = await getPreviewPdf(entry, pdfCache);
        const caption = type === "merge"
          ? `${planIndex + 1}. ${entry.file.name} - page ${entry.pageIndex + 1}`
          : `${planIndex + 1}. Page ${entry.pageIndex + 1}`;

        showProgress(
          type,
          "Rendering page previews",
          planIndex,
          pages.length,
          caption
        );
        await appendPageEditorCard(pdf, entry, planIndex, caption, container, thumbnailWidth, type);
      }

      clearProgress(type);
    } catch (error) {
      const message = formatPdfError("Could not render previews.", error);
      container.innerHTML = "";
      appendPreviewNote(container, message);
      showMessage(type, message, "error");
    } finally {
      pdfCache.forEach((pdf) => {
        pdf.destroy();
      });
    }
  }

  async function getPreviewPdf(entry, cache) {
    if (!cache.has(entry.fileId)) {
      try {
        cache.set(entry.fileId, await loadPdfJsDocument(entry.file, "render page previews"));
      } catch (error) {
        throw addFileContext(error, entry.file);
      }
    }

    return cache.get(entry.fileId);
  }

  async function appendPageEditorCard(pdf, entry, planIndex, caption, container, thumbnailWidth, type) {
    const page = await pdf.getPage(entry.pageIndex + 1);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = thumbnailWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width * pixelRatio);
    canvas.height = Math.ceil(viewport.height * pixelRatio);

    const context = canvas.getContext("2d");
    await page.render({
      canvasContext: context,
      transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      viewport
    }).promise;
    canvas.style.transform = `rotate(${entry.rotation}deg)`;

    const card = document.createElement("div");
    card.className = "preview-card";
    card.draggable = true;
    card.dataset.index = String(planIndex);
    card.dataset.type = type;

    const canvasWrap = document.createElement("div");
    canvasWrap.className = "preview-canvas-wrap";
    canvasWrap.appendChild(canvas);

    const captionEl = document.createElement("div");
    captionEl.className = "preview-caption";
    captionEl.textContent = entry.rotation
      ? `${caption} - rotated ${entry.rotation} deg`
      : caption;

    const actions = document.createElement("div");
    actions.className = "preview-actions";
    actions.append(
      makePreviewButton("Rotate left", "Left", () => rotatePage(type, entry.id, -90)),
      makePreviewButton("Rotate right", "Right", () => rotatePage(type, entry.id, 90)),
      makePreviewButton("Delete page", "Delete", () => deletePage(type, entry.id), true)
    );

    setupPageSortableCard(card, type, planIndex);
    card.append(canvasWrap, captionEl, actions);
    container.appendChild(card);
  }

  function makePreviewButton(label, text, onClick, danger) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = danger ? "preview-button danger" : "preview-button";
    button.textContent = text;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.addEventListener("click", onClick);
    return button;
  }

  function setupPageSortableCard(card, type, index) {
    card.addEventListener("dragstart", (event) => {
      state.pageDrag = { type, index };
      card.classList.add("is-dragging");

      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", `${type}:${index}`);
      }
    });

    card.addEventListener("dragend", () => {
      state.pageDrag = null;
      card.classList.remove("is-dragging");
      clearPageDragOverCards();
    });

    card.addEventListener("dragover", (event) => {
      if (!state.pageDrag || state.pageDrag.type !== type) return;
      event.preventDefault();
      card.classList.add("is-drag-over");

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("is-drag-over");
    });

    card.addEventListener("drop", (event) => {
      event.preventDefault();

      if (!state.pageDrag || state.pageDrag.type !== type || state.pageDrag.index === index) {
        card.classList.remove("is-drag-over");
        return;
      }

      movePage(type, state.pageDrag.index, index);
      state.pageDrag = null;
      clearPageDragOverCards();
    });
  }

  function clearPageDragOverCards() {
    document.querySelectorAll(".preview-card.is-drag-over").forEach((card) => {
      card.classList.remove("is-drag-over");
    });
  }

  function getPagePlan(type) {
    return type === "merge" ? state.mergePages : state.splitPages;
  }

  function setPagePlan(type, pages) {
    if (type === "merge") {
      state.mergePages = pages;
      refreshList("merge");
    } else {
      state.splitPages = pages;
      refreshList("split");
    }
  }

  function movePage(type, from, to) {
    const pages = getPagePlan(type).slice();
    const [page] = pages.splice(from, 1);
    pages.splice(to, 0, page);
    setPagePlan(type, pages);
  }

  function rotatePage(type, id, delta) {
    const pages = getPagePlan(type).map((page) => {
      if (page.id !== id) return page;

      return {
        ...page,
        rotation: normalizeRotation(page.rotation + delta)
      };
    });
    setPagePlan(type, pages);
  }

  function rotateAllPages(type, delta) {
    if (!getPagePlan(type).length) return;

    const pages = getPagePlan(type).map((page) => {
      return {
        ...page,
        rotation: normalizeRotation(page.rotation + delta)
      };
    });
    setPagePlan(type, pages);
  }

  function deletePage(type, id) {
    const pages = getPagePlan(type).filter((page) => page.id !== id);
    setPagePlan(type, pages);
  }

  function resetPagePlan(type) {
    if (type === "merge") {
      if (!state.mergeFiles.length) return;
      setMergeFiles(state.mergeFiles.slice());
    } else {
      if (!state.splitFile) return;
      setSplitFile(state.splitFile);
    }
  }

  function normalizeRotation(rotation) {
    return ((rotation % 360) + 360) % 360;
  }

  function appendPreviewNote(container, text) {
    const note = document.createElement("div");
    note.className = "preview-note";
    note.textContent = text;
    container.appendChild(note);
  }

  async function mergePdfs() {
    if (!hasPdfLib()) {
      showMessage("merge", "The PDF library did not load. Check your internet connection, then refresh this page.", "error");
      return;
    }

    if (!state.mergePages.length) {
      showMessage("merge", "Select PDF files and keep at least one page in the merge editor.", "error");
      return;
    }

    const clearBusy = setBusy(els.mergeButton, "Merging...");

    try {
      const { PDFDocument } = window.PDFLib;
      const outputPdf = await PDFDocument.create();
      showProgress("merge", "Merging pages", 0, state.mergePages.length, "Preparing output PDF");
      await addPlannedPages(outputPdf, state.mergePages, (current, total, detail) => {
        showProgress("merge", "Merging pages", current, total, detail);
      });

      showProgress("merge", "Merging pages", state.mergePages.length, state.mergePages.length, "Preparing download");
      const bytes = await outputPdf.save();
      setDownload("merge", bytes, "merged.pdf", "Download merged PDF");
    } catch (error) {
      showMessage("merge", formatPdfError("Could not merge these PDFs.", error), "error");
    } finally {
      clearBusy();
    }
  }

  async function splitPdf() {
    if (!hasPdfLib()) {
      showMessage("split", "The PDF library did not load. Check your internet connection, then refresh this page.", "error");
      return;
    }

    const file = state.splitFile;

    if (!file) {
      showMessage("split", "Select one PDF file to split.", "error");
      return;
    }

    if (!state.splitPages.length) {
      showMessage("split", "Keep at least one page in the split editor.", "error");
      return;
    }

    const clearBusy = setBusy(els.splitButton, "Splitting...");

    try {
      const { PDFDocument } = window.PDFLib;
      const pageCount = state.splitPages.length;
      const mode = document.querySelector("input[name='splitMode']:checked").value;
      const baseName = sanitizeName(file.name);

      if (mode === "every") {
        if (!hasZipLib()) {
          showMessage("split", "The ZIP library did not load. Refresh this page, then try again.", "error");
          return;
        }

        const zip = new window.JSZip();
        let sourcePdf;
        showProgress("split", "Splitting PDF", 0, pageCount, "Opening source PDF");

        try {
          sourcePdf = await PDFDocument.load(await file.arrayBuffer());
        } catch (error) {
          throw addFileContext(error, file);
        }

        for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
          const entry = state.splitPages[pageIndex];
          showProgress("split", "Splitting PDF", pageIndex, pageCount, `Creating page ${pageIndex + 1} of ${pageCount}`);
          const outputPdf = await PDFDocument.create();
          const [copiedPage] = await outputPdf.copyPages(sourcePdf, [entry.pageIndex]);
          applyRotationToCopiedPage(copiedPage, entry.rotation);
          outputPdf.addPage(copiedPage);
          const pageBytes = await outputPdf.save();
          zip.file(`${baseName}-page-${pageIndex + 1}.pdf`, pageBytes);
          showProgress("split", "Splitting PDF", pageIndex + 1, pageCount, `Created page ${pageIndex + 1} of ${pageCount}`);
        }

        const zipBytes = await zip.generateAsync({
          compression: "DEFLATE",
          type: "uint8array"
        }, (metadata) => {
          showProgress("split", "Packaging ZIP", metadata.percent, 100, "Compressing split PDFs into one download");
        });
        setDownload(
          "split",
          zipBytes,
          `${baseName}-split-pages.zip`,
          `Download ${pageCount} page PDF${pageCount === 1 ? "" : "s"} as ZIP`,
          "application/zip"
        );
        return;
      }

      const pageIndexes = getSplitPageIndexes(mode, pageCount);
      const selectedPages = pageIndexes.map((pageIndex) => state.splitPages[pageIndex]);

      const outputPdf = await PDFDocument.create();
      showProgress("split", "Splitting PDF", 0, selectedPages.length, "Preparing selected pages");
      await addPlannedPages(outputPdf, selectedPages, (current, total, detail) => {
        showProgress("split", "Splitting PDF", current, total, detail);
      });

      showProgress("split", "Splitting PDF", selectedPages.length, selectedPages.length, "Preparing download");
      const bytes = await outputPdf.save();
      const suffix = getSplitSuffix(mode);
      const label = mode === "range" ? "Download page range PDF" : "Download split PDF";
      setDownload("split", bytes, `${baseName}-${suffix}.pdf`, label);
    } catch (error) {
      showMessage("split", formatPdfError("Could not split this PDF.", error), "error");
    } finally {
      clearBusy();
    }
  }

  async function addPlannedPages(outputPdf, plannedPages, onProgress) {
    const sourceDocs = new Map();

    for (const [index, entry] of plannedPages.entries()) {
      if (onProgress) {
        onProgress(index, plannedPages.length, `Adding ${entry.file.name} page ${entry.pageIndex + 1}`);
      }

      if (!sourceDocs.has(entry.fileId)) {
        try {
          sourceDocs.set(entry.fileId, await window.PDFLib.PDFDocument.load(await entry.file.arrayBuffer()));
        } catch (error) {
          throw addFileContext(error, entry.file);
        }
      }

      const sourcePdf = sourceDocs.get(entry.fileId);
      const [copiedPage] = await outputPdf.copyPages(sourcePdf, [entry.pageIndex]);
      applyRotationToCopiedPage(copiedPage, entry.rotation);
      outputPdf.addPage(copiedPage);

      if (onProgress) {
        onProgress(index + 1, plannedPages.length, `Added ${entry.file.name} page ${entry.pageIndex + 1}`);
      }
    }
  }

  function applyRotationToCopiedPage(page, rotation) {
    if (!rotation) return;

    const currentRotation = page.getRotation().angle || 0;
    page.setRotation(window.PDFLib.degrees(normalizeRotation(currentRotation + rotation)));
  }

  async function compressPdf() {
    if (!hasPdfLib()) {
      showMessage("compress", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.compressFile) {
      showMessage("compress", "Select one PDF file to compress.", "error");
      return;
    }

    const clearBusy = setBusy(els.compressButton, "Compressing...");

    try {
      showProgress("compress", "Compressing PDF", 0, 4, `Reading ${state.compressFile.name}`);
      const originalBytes = new Uint8Array(await state.compressFile.arrayBuffer());
      showProgress("compress", "Compressing PDF", 1, 4, "Opening PDF structure");
      let pdfDoc;

      try {
        pdfDoc = await window.PDFLib.PDFDocument.load(originalBytes, {
          updateMetadata: false
        });
      } catch (error) {
        throw addFileContext(error, state.compressFile);
      }

      showProgress("compress", "Compressing PDF", 2, 4, "Optimizing object streams");
      const optimizedBytes = await pdfDoc.save({
        addDefaultPage: false,
        objectsPerTick: 50,
        useObjectStreams: true
      });
      showProgress("compress", "Compressing PDF", 3, 4, "Preparing download");
      const smallerBytes = optimizedBytes.length < originalBytes.length ? optimizedBytes : originalBytes;
      const savedBytes = originalBytes.length - smallerBytes.length;
      const savedPercent = originalBytes.length ? (savedBytes / originalBytes.length) * 100 : 0;
      const label = savedBytes > 0
        ? `Download compressed PDF - saved ${savedPercent.toFixed(1)}%`
        : "Download optimized PDF - already compact";

      setDownload(
        "compress",
        smallerBytes,
        `${sanitizeName(state.compressFile.name)}-compressed.pdf`,
        label
      );
    } catch (error) {
      showMessage("compress", formatPdfError("Could not compress this PDF.", error), "error");
    } finally {
      clearBusy();
    }
  }

  async function watermarkPdf() {
    if (!hasPdfLib()) {
      showMessage("watermark", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.watermarkFile) {
      showMessage("watermark", "Select one PDF file to watermark.", "error");
      return;
    }

    const settings = getWatermarkSettings();

    if (!settings.text) {
      showMessage("watermark", "Enter watermark text.", "error");
      return;
    }

    const clearBusy = setBusy(els.watermarkButton, "Watermarking...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      showProgress("watermark", "Adding watermark", 0, 1, `Reading ${state.watermarkFile.name}`);
      const originalBytes = new Uint8Array(await state.watermarkFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.watermarkFile);
      }

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const totalSteps = pages.length + 2;
      showProgress("watermark", "Adding watermark", 1, totalSteps, "Opening PDF pages");

      pages.forEach((page, index) => {
        drawWatermarkOnPage(page, font, settings);
        showProgress("watermark", "Adding watermark", index + 2, totalSteps, `Stamped page ${index + 1}`);
      });

      showProgress("watermark", "Adding watermark", totalSteps - 1, totalSteps, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        objectsPerTick: 50,
        useObjectStreams: true
      });
      setDownload(
        "watermark",
        pdfBytes,
        `${sanitizeName(state.watermarkFile.name)}-watermarked.pdf`,
        "Download watermarked PDF"
      );
    } catch (error) {
      showMessage("watermark", formatPdfError("Could not add watermark.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getWatermarkSettings() {
    const fontSize = Number(els.watermarkFontSize.value);
    const opacity = Number(els.watermarkOpacity.value);

    return {
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 12, 96) : 42,
      opacity: (Number.isFinite(opacity) ? clamp(opacity, 5, 80) : 22) / 100,
      position: els.watermarkPosition.value,
      text: safePdfText(els.watermarkText.value).trim()
    };
  }

  function drawWatermarkOnPage(page, font, settings) {
    const { degrees, rgb } = window.PDFLib;
    const { width, height } = page.getSize();
    const maxWidth = Math.max(80, width * 0.78);
    let fontSize = settings.fontSize;

    while (fontSize > 12 && font.widthOfTextAtSize(settings.text, fontSize) > maxWidth) {
      fontSize -= 2;
    }

    const textWidth = font.widthOfTextAtSize(settings.text, fontSize);
    const xCenter = (width - textWidth) / 2;
    const color = rgb(0.15, 0.18, 0.16);
    const options = {
      color,
      font,
      opacity: settings.opacity,
      size: fontSize
    };

    if (settings.position === "top") {
      page.drawText(settings.text, {
        ...options,
        x: xCenter,
        y: height - fontSize - 42
      });
      return;
    }

    if (settings.position === "bottom") {
      page.drawText(settings.text, {
        ...options,
        x: xCenter,
        y: 42
      });
      return;
    }

    if (settings.position === "center") {
      page.drawText(settings.text, {
        ...options,
        x: xCenter,
        y: (height - fontSize) / 2
      });
      return;
    }

    page.drawText(settings.text, {
      ...options,
      rotate: degrees(-35),
      x: width * 0.16,
      y: height * 0.34
    });
  }

  async function pageNumbersPdf() {
    if (!hasPdfLib()) {
      showMessage("pageNumbers", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.pageNumberFile) {
      showMessage("pageNumbers", "Select one PDF file to add page numbers.", "error");
      return;
    }

    const settings = getPageNumberSettings();
    const clearBusy = setBusy(els.pageNumberButton, "Numbering...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      showProgress("pageNumbers", "Adding page numbers", 0, 1, `Reading ${state.pageNumberFile.name}`);
      const originalBytes = new Uint8Array(await state.pageNumberFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.pageNumberFile);
      }

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalSteps = pages.length + 2;
      showProgress("pageNumbers", "Adding page numbers", 1, totalSteps, "Opening PDF pages");

      pages.forEach((page, index) => {
        const pageNumber = settings.startNumber + index;
        const label = getPageNumberLabel(pageNumber, settings.startNumber + pages.length - 1, settings.format);
        drawPageNumberOnPage(page, font, label, settings);
        showProgress("pageNumbers", "Adding page numbers", index + 2, totalSteps, `Numbered page ${index + 1}`);
      });

      showProgress("pageNumbers", "Adding page numbers", totalSteps - 1, totalSteps, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        objectsPerTick: 50,
        useObjectStreams: true
      });
      setDownload(
        "pageNumbers",
        pdfBytes,
        `${sanitizeName(state.pageNumberFile.name)}-page-numbers.pdf`,
        "Download numbered PDF"
      );
    } catch (error) {
      showMessage("pageNumbers", formatPdfError("Could not add page numbers.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getPageNumberSettings() {
    const startNumber = Number(els.pageNumberStart.value);
    const fontSize = Number(els.pageNumberFontSize.value);

    return {
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 8, 36) : 11,
      format: els.pageNumberFormat.value,
      position: els.pageNumberPosition.value,
      startNumber: Number.isInteger(startNumber) ? clamp(startNumber, 0, 9999) : 1
    };
  }

  function getPageNumberLabel(pageNumber, finalNumber, format) {
    if (format === "plain") {
      return String(pageNumber);
    }

    if (format === "total") {
      return `${pageNumber} / ${finalNumber}`;
    }

    return `Page ${pageNumber}`;
  }

  function drawPageNumberOnPage(page, font, label, settings) {
    const { rgb } = window.PDFLib;
    const { width, height } = page.getSize();
    const margin = 36;
    const textWidth = font.widthOfTextAtSize(label, settings.fontSize);
    const xCenter = (width - textWidth) / 2;
    const yBottom = margin;
    const yTop = height - settings.fontSize - margin;
    let x = xCenter;
    let y = yBottom;

    if (settings.position === "bottom-left") {
      x = margin;
    } else if (settings.position === "bottom-right") {
      x = width - textWidth - margin;
    } else if (settings.position === "top-center") {
      y = yTop;
    }

    page.drawText(label, {
      color: rgb(0.18, 0.22, 0.2),
      font,
      opacity: 0.85,
      size: settings.fontSize,
      x: clamp(x, 12, Math.max(12, width - textWidth - 12)),
      y: clamp(y, 12, Math.max(12, height - settings.fontSize - 12))
    });
  }

  async function signPdf(button = els.signatureButton) {
    if (!hasPdfLib()) {
      showMessage("signature", "The PDF library did not load. Refresh this page, then try again.", "error");
      return false;
    }

    if (!state.signatureFile) {
      showMessage("signature", "Select one PDF file to sign.", "error");
      return false;
    }

    const settings = getSignatureSettings();

    const hasFullDrawing = hasActiveFullSignatureDrawing(settings);

    if (settings.mode === "draw" && !state.signatureHasInk && !hasFullDrawing) {
      showMessage("signature", "Draw a signature in the pad, or open Full-view signer and draw directly on the page.", "error");
      return false;
    }

    if (settings.mode === "type" && !settings.text) {
      showMessage("signature", "Type a signature name before signing the PDF.", "error");
      return false;
    }

    const clearBusy = setBusy(button, "Signing...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      showProgress("signature", "Signing PDF", 0, 5, `Reading ${state.signatureFile.name}`);
      const originalBytes = new Uint8Array(await state.signatureFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.signatureFile);
      }

      const pages = pdfDoc.getPages();

      if (settings.pageNumber < 1 || settings.pageNumber > pages.length) {
        throw new Error(`Page ${settings.pageNumber} is outside this ${pages.length}-page PDF.`);
      }

      const page = pages[settings.pageNumber - 1];
      showProgress("signature", "Signing PDF", 2, 5, `Placing signature on page ${settings.pageNumber}`);

      if (settings.mode === "draw" && hasFullDrawing) {
        await drawFullPageSignature(pdfDoc, page);
      } else if (settings.mode === "draw") {
        await drawCanvasSignature(pdfDoc, page, settings);
      } else {
        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
        drawTypedSignature(page, font, settings);
      }

      showProgress("signature", "Signing PDF", 4, 5, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        objectsPerTick: 50,
        useObjectStreams: true
      });
      setDownload(
        "signature",
        pdfBytes,
        `${sanitizeName(state.signatureFile.name)}-signed.pdf`,
        "Download signed PDF"
      );
      return true;
    } catch (error) {
      showMessage("signature", formatPdfError("Could not sign this PDF.", error), "error");
      return false;
    } finally {
      clearBusy();
    }
  }

  function getSignatureSettings() {
    const pageNumber = Number(els.signaturePage.value);
    const width = Number(els.signatureWidth.value);
    const strokeWidth = Number(els.signatureStrokeWidth.value);
    const customX = Number(els.signatureX.value);
    const customY = Number(els.signatureY.value);

    return {
      color: els.signatureColor.value,
      customX: Number.isFinite(customX) ? clamp(customX, 0, 100) : 70,
      customY: Number.isFinite(customY) ? clamp(customY, 0, 100) : 12,
      mode: els.signatureMode.value,
      pageNumber: Number.isInteger(pageNumber) ? pageNumber : 1,
      position: els.signaturePosition.value,
      strokeWidth: Number.isFinite(strokeWidth) ? clamp(strokeWidth, 2, 10) : 4,
      text: safePdfText(els.signatureText.value).trim(),
      width: Number.isFinite(width) ? clamp(width, 80, 260) : 160
    };
  }

  function hasActiveFullSignatureDrawing(settings) {
    return Boolean(
      state.signatureFile
      && state.signatureFullTool === "draw"
      && state.signatureFullDrawHasInk
      && state.signatureFullDrawPage === settings.pageNumber
      && state.signatureFullDrawFileId === getFileId(state.signatureFile)
      && els.signatureFullDrawCanvas.width
      && els.signatureFullDrawCanvas.height
    );
  }

  async function drawFullPageSignature(pdfDoc, page) {
    const pngBytes = dataUrlToUint8Array(els.signatureFullDrawCanvas.toDataURL("image/png"));
    const signatureImage = await pdfDoc.embedPng(pngBytes);
    const { width, height } = page.getSize();

    page.drawImage(signatureImage, {
      height,
      opacity: 0.96,
      width,
      x: 0,
      y: 0
    });
  }

  async function drawCanvasSignature(pdfDoc, page, settings) {
    const pngBytes = dataUrlToUint8Array(els.signatureCanvas.toDataURL("image/png"));
    const signatureImage = await pdfDoc.embedPng(pngBytes);
    const imageHeight = settings.width * (signatureImage.height / signatureImage.width);
    const placement = getSignaturePlacement(page, settings.width, imageHeight, settings);

    page.drawImage(signatureImage, {
      height: imageHeight,
      opacity: 0.96,
      width: settings.width,
      x: placement.x,
      y: placement.y
    });
  }

  function drawTypedSignature(page, font, settings) {
    let fontSize = 32;

    while (fontSize > 14 && font.widthOfTextAtSize(settings.text, fontSize) > settings.width) {
      fontSize -= 1;
    }

    const textWidth = font.widthOfTextAtSize(settings.text, fontSize);
    const placement = getSignaturePlacement(page, textWidth, fontSize, settings);

    page.drawText(settings.text, {
      color: getSignaturePdfColor(settings),
      font,
      opacity: 0.92,
      size: fontSize,
      x: placement.x,
      y: placement.y
    });
  }

  function getSignaturePlacement(page, signatureWidth, signatureHeight, settings) {
    const { width, height } = page.getSize();
    const margin = 48;
    const position = settings.position;
    let x = width - signatureWidth - margin;
    let y = margin;

    if (position === "custom") {
      const maxX = Math.max(0, width - signatureWidth);
      const maxY = Math.max(0, height - signatureHeight);
      x = maxX * (settings.customX / 100);
      y = maxY * (settings.customY / 100);
    } else if (position === "bottom-left") {
      x = margin;
    } else if (position === "center") {
      x = (width - signatureWidth) / 2;
      y = (height - signatureHeight) / 2;
    } else if (position === "top-right") {
      y = height - signatureHeight - margin;
    } else if (position === "top-left") {
      x = margin;
      y = height - signatureHeight - margin;
    }

    return {
      x: clamp(x, 12, Math.max(12, width - signatureWidth - 12)),
      y: clamp(y, 12, Math.max(12, height - signatureHeight - 12))
    };
  }

  function getSignatureColor(settings) {
    const colors = {
      black: {
        hex: "#121614",
        pdf: [0.08, 0.1, 0.09]
      },
      blue: {
        hex: "#1d4ed8",
        pdf: [0.11, 0.31, 0.85]
      },
      red: {
        hex: "#b42318",
        pdf: [0.71, 0.14, 0.09]
      }
    };

    return colors[settings.color] || colors.black;
  }

  function getSignaturePdfColor(settings) {
    const { rgb } = window.PDFLib;
    const [red, green, blue] = getSignatureColor(settings).pdf;
    return rgb(red, green, blue);
  }

  function applySignatureStrokeStyle(context, settings, pixelRatio = 1) {
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = settings.strokeWidth * pixelRatio;
    context.strokeStyle = getSignatureColor(settings).hex;
  }

  function dataUrlToUint8Array(dataUrl) {
    const base64 = dataUrl.split(",")[1] || "";
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  }

  async function openSignatureFullView() {
    if (!state.signatureFile) {
      showMessage("signature", "Select one PDF file before opening full-view signing.", "error");
      return;
    }

    if (!hasPdfJs()) {
      showMessage("signature", "The local PDF preview library did not load. Refresh this page, then try again.", "error");
      return;
    }

    els.signatureFullModal.hidden = false;
    updateModalOpenState();
    state.signatureFullTool = getDefaultSignatureFullTool();
    syncSignatureFullMode();
    setSignatureFullStatus("Opening page preview...");
    await renderSignatureFullPreview();

    if (isSignatureFullOpen()) {
      els.signatureFullClose.focus();
    }
  }

  function closeSignatureFullView() {
    state.signatureFullRenderId += 1;
    els.signatureFullModal.hidden = true;
    updateModalOpenState();
    state.signatureFullDrawing = false;
    state.signaturePlacementDrag = null;
    els.signaturePlacementPreview.classList.remove("is-dragging");
  }

  function isSignatureFullOpen() {
    return !els.signatureFullModal.hidden;
  }

  function getDefaultSignatureFullTool() {
    return els.signatureMode.value === "type" || state.signatureHasInk ? "place" : "draw";
  }

  function setSignatureFullTool(tool) {
    state.signatureFullTool = els.signatureMode.value === "type" ? "place" : tool;
    syncSignatureFullMode();
  }

  function isSignatureFullPlacementMode() {
    return isSignatureFullOpen() && state.signatureFullTool === "place";
  }

  function isSignatureFullDrawingMode() {
    return isSignatureFullOpen() && els.signatureMode.value === "draw" && state.signatureFullTool === "draw";
  }

  async function renderSignatureFullPreview(options = {}) {
    if (!isSignatureFullOpen() || !state.signatureFile) return;

    const run = ++state.signatureFullRenderId;
    const file = state.signatureFile;
    let pdf;

    try {
      setSignatureFullStatus("Rendering page preview...");
      pdf = await loadPdfJsDocument(file, "render the signing preview");

      if (run !== state.signatureFullRenderId) return;

      state.signatureFullPageCount = pdf.numPages;
      const pageNumber = normalizeSignatureFullPageNumber(pdf.numPages);
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(280, (els.signatureFullStageWrap.clientWidth || 900) - 34);
      const scale = clamp(Math.min(availableWidth / baseViewport.width, 1.85), 0.35, 1.85);
      const viewport = page.getViewport({ scale });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      state.signatureFullScale = scale;
      els.signatureFullStage.style.width = `${viewport.width}px`;
      els.signatureFullStage.style.height = `${viewport.height}px`;
      els.signatureFullCanvas.width = Math.ceil(viewport.width * pixelRatio);
      els.signatureFullCanvas.height = Math.ceil(viewport.height * pixelRatio);
      els.signatureFullCanvas.style.width = `${viewport.width}px`;
      els.signatureFullCanvas.style.height = `${viewport.height}px`;

      const context = els.signatureFullCanvas.getContext("2d");
      await page.render({
        canvasContext: context,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        viewport
      }).promise;

      if (run !== state.signatureFullRenderId) return;

      resizeSignatureFullDrawCanvas(viewport, pixelRatio, {
        pageNumber,
        preserveDrawing: !options.resetDrawing
      });
      setSignatureFullStatus(`Page ${pageNumber} of ${pdf.numPages} - ${file.name}`);
      syncSignatureFullMode();
    } catch (error) {
      if (run !== state.signatureFullRenderId || !isSignatureFullOpen()) return;

      const message = formatPdfError("Could not render the signing preview.", addFileContext(error, file));
      setSignatureFullStatus(message);
      showMessage("signature", message, "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }
    }
  }

  function normalizeSignatureFullPageNumber(pageCount) {
    const current = Math.round(Number(els.signaturePage.value));
    const pageNumber = clamp(Number.isFinite(current) ? current : 1, 1, pageCount);
    els.signaturePage.value = pageNumber;
    els.signaturePage.max = pageCount;
    updateSignatureFullNavigation();
    return pageNumber;
  }

  function setSignatureFullStatus(text) {
    els.signatureFullStatus.textContent = text;
  }

  function resizeSignatureFullDrawCanvas(viewport, pixelRatio, options) {
    const oldCanvas = document.createElement("canvas");
    const shouldPreserve = options.preserveDrawing
      && state.signatureFullDrawHasInk
      && state.signatureFullDrawPage === options.pageNumber
      && state.signatureFile
      && state.signatureFullDrawFileId === getFileId(state.signatureFile)
      && els.signatureFullDrawCanvas.width
      && els.signatureFullDrawCanvas.height;

    if (shouldPreserve) {
      oldCanvas.width = els.signatureFullDrawCanvas.width;
      oldCanvas.height = els.signatureFullDrawCanvas.height;
      oldCanvas.getContext("2d").drawImage(els.signatureFullDrawCanvas, 0, 0);
    }

    els.signatureFullDrawCanvas.width = Math.ceil(viewport.width * pixelRatio);
    els.signatureFullDrawCanvas.height = Math.ceil(viewport.height * pixelRatio);
    els.signatureFullDrawCanvas.style.width = `${viewport.width}px`;
    els.signatureFullDrawCanvas.style.height = `${viewport.height}px`;

    const context = getSignatureFullContext();

    if (context) {
      context.clearRect(0, 0, els.signatureFullDrawCanvas.width, els.signatureFullDrawCanvas.height);

      if (shouldPreserve) {
        context.drawImage(oldCanvas, 0, 0, els.signatureFullDrawCanvas.width, els.signatureFullDrawCanvas.height);
      }
    }

    if (!shouldPreserve) {
      state.signatureFullDrawHasInk = false;
      state.signatureFullDrawPage = null;
      state.signatureFullDrawFileId = null;
    }
  }

  function updateSignatureFullNavigation() {
    const pageNumber = Math.round(Number(els.signaturePage.value)) || 1;
    const pageCount = state.signatureFullPageCount || pageNumber;
    const isDrawMode = isSignatureFullDrawingMode();

    els.signatureFullPrev.disabled = pageNumber <= 1;
    els.signatureFullNext.disabled = pageNumber >= pageCount;
    els.signatureFullClear.disabled = !isDrawMode || !state.signatureFullDrawHasInk;
  }

  function setSignatureFullPage(delta) {
    const pageCount = state.signatureFullPageCount || 1;
    const current = Math.round(Number(els.signaturePage.value)) || 1;
    els.signaturePage.value = clamp(current + delta, 1, pageCount);
    clearSignatureFullDrawing(true);
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
    renderSignatureFullPreview({ resetDrawing: true });
  }

  function syncSignatureFullMode() {
    const isTypeMode = els.signatureMode.value === "type";
    const canPlaceSignature = isTypeMode || state.signatureHasInk;

    if (!canPlaceSignature && state.signatureFullTool === "place") {
      state.signatureFullTool = "draw";
    }

    const isPlaceTool = isTypeMode || state.signatureFullTool === "place";

    if (isTypeMode) {
      state.signatureFullTool = "place";
    }

    els.signatureFullModal.classList.toggle("is-type-mode", isTypeMode);
    els.signatureFullModal.classList.toggle("is-draw-mode", !isTypeMode);
    els.signatureFullModal.classList.toggle("is-place-tool", isPlaceTool);
    els.signatureFullModal.classList.toggle("is-draw-tool", !isPlaceTool);
    els.signatureFullToolDraw.disabled = isTypeMode;
    els.signatureFullToolPlace.disabled = !canPlaceSignature;
    els.signatureFullToolDraw.classList.toggle("is-active", !isPlaceTool);
    els.signatureFullToolPlace.classList.toggle("is-active", isPlaceTool);
    els.signatureFullToolDraw.setAttribute("aria-pressed", String(!isPlaceTool));
    els.signatureFullToolPlace.setAttribute("aria-pressed", String(isPlaceTool));
    updateSignaturePlacementPreview();
    updateSignatureFullNavigation();
  }

  function getSignatureFullContext() {
    return els.signatureFullDrawCanvas ? els.signatureFullDrawCanvas.getContext("2d") : null;
  }

  function beginSignatureFullStroke(event) {
    if (!isSignatureFullDrawingMode()) return;
    if (event.button !== undefined && event.button > 0) return;

    const context = getSignatureFullContext();
    if (!context) return;

    const point = getSignatureFullPoint(event);
    const rect = els.signatureFullDrawCanvas.getBoundingClientRect();
    const pixelRatio = els.signatureFullDrawCanvas.width / Math.max(rect.width, 1);
    event.preventDefault();
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
    state.signatureFullDrawing = true;
    state.signatureFullDrawHasInk = true;
    state.signatureFullDrawPage = Math.round(Number(els.signaturePage.value)) || 1;
    state.signatureFullDrawFileId = getFileId(state.signatureFile);
    applySignatureStrokeStyle(context, getSignatureSettings(), pixelRatio);
    context.beginPath();
    context.moveTo(point.x, point.y);
    updateSignatureFullNavigation();

    if (els.signatureFullDrawCanvas.setPointerCapture) {
      els.signatureFullDrawCanvas.setPointerCapture(event.pointerId);
    }
  }

  function continueSignatureFullStroke(event) {
    if (!state.signatureFullDrawing) return;

    const context = getSignatureFullContext();
    if (!context) return;

    const point = getSignatureFullPoint(event);
    event.preventDefault();
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function endSignatureFullStroke(event) {
    if (!state.signatureFullDrawing) return;

    state.signatureFullDrawing = false;

    if (els.signatureFullDrawCanvas.releasePointerCapture) {
      try {
        els.signatureFullDrawCanvas.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture may already be released by the browser.
      }
    }
  }

  function getSignatureFullPoint(event) {
    const rect = els.signatureFullDrawCanvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * els.signatureFullDrawCanvas.width,
      y: ((event.clientY - rect.top) / rect.height) * els.signatureFullDrawCanvas.height
    };
  }

  function clearSignatureFullDrawing(silent) {
    const context = getSignatureFullContext();

    if (context) {
      context.clearRect(0, 0, els.signatureFullDrawCanvas.width, els.signatureFullDrawCanvas.height);
    }

    state.signatureFullDrawing = false;
    state.signatureFullDrawHasInk = false;
    state.signatureFullDrawPage = null;
    state.signatureFullDrawFileId = null;
    updateSignatureFullNavigation();

    if (!silent) {
      revokeToolUrls("signature");
      els.signatureResult.innerHTML = "";
    }
  }

  function updateSignaturePlacementPreview() {
    if (!isSignatureFullPlacementMode() || !els.signatureFullStage.clientWidth) {
      els.signaturePlacementPreview.hidden = true;
      return;
    }

    const settings = getSignatureSettings();

    if (settings.mode === "draw" && !state.signatureHasInk) {
      els.signaturePlacementPreview.hidden = true;
      return;
    }

    const metrics = getSignaturePreviewMetrics(settings);
    const placement = getSignaturePreviewPlacementCss(metrics, settings);
    const label = settings.text || "Signature";

    els.signaturePlacementLabel.textContent = label;
    els.signaturePlacementPreview.hidden = false;
    els.signaturePlacementPreview.classList.toggle("has-image", settings.mode === "draw");
    els.signaturePlacementPreview.style.backgroundImage = settings.mode === "draw"
      ? `url("${els.signatureCanvas.toDataURL("image/png")}")`
      : "";
    els.signaturePlacementPreview.style.width = `${metrics.width}px`;
    els.signaturePlacementPreview.style.height = `${metrics.height}px`;
    els.signaturePlacementPreview.style.left = `${placement.left}px`;
    els.signaturePlacementPreview.style.top = `${placement.top}px`;
    els.signaturePlacementPreview.style.color = getSignatureColor(settings).hex;
  }

  function getSignaturePreviewMetrics(settings) {
    const stageWidth = els.signatureFullStage.clientWidth;
    const stageHeight = els.signatureFullStage.clientHeight;
    const maxWidth = Math.max(72, stageWidth - 16);
    const maxHeight = Math.max(34, stageHeight - 16);
    const width = Math.min(maxWidth, Math.max(88, settings.width * state.signatureFullScale));

    return {
      height: settings.mode === "draw"
        ? Math.min(maxHeight, Math.max(32, width * (els.signatureCanvas.height / els.signatureCanvas.width)))
        : Math.min(maxHeight, clamp(38 * state.signatureFullScale, 34, 58)),
      width
    };
  }

  function getSignaturePreviewPlacementCss(metrics, settings) {
    const stageWidth = els.signatureFullStage.clientWidth;
    const stageHeight = els.signatureFullStage.clientHeight;
    const margin = 48 * state.signatureFullScale;
    const maxLeft = Math.max(0, stageWidth - metrics.width);
    const maxTop = Math.max(0, stageHeight - metrics.height);
    let left = maxLeft - margin;
    let top = maxTop - margin;

    if (settings.position === "custom") {
      left = maxLeft * (settings.customX / 100);
      top = maxTop * (1 - settings.customY / 100);
    } else if (settings.position === "bottom-left") {
      left = margin;
    } else if (settings.position === "center") {
      left = maxLeft / 2;
      top = maxTop / 2;
    } else if (settings.position === "top-right") {
      top = margin;
    } else if (settings.position === "top-left") {
      left = margin;
      top = margin;
    }

    return {
      left: clamp(left, 0, maxLeft),
      top: clamp(top, 0, maxTop)
    };
  }

  function beginSignaturePlacementDrag(event) {
    if (!isSignatureFullPlacementMode() || event.button > 0) return;

    const rect = els.signaturePlacementPreview.getBoundingClientRect();
    event.preventDefault();
    state.signaturePlacementDrag = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    els.signaturePlacementPreview.classList.add("is-dragging");

    if (els.signaturePlacementPreview.setPointerCapture) {
      els.signaturePlacementPreview.setPointerCapture(event.pointerId);
    }
  }

  function continueSignaturePlacementDrag(event) {
    if (!state.signaturePlacementDrag) return;

    event.preventDefault();
    moveSignaturePlacementToPoint(
      event.clientX,
      event.clientY,
      state.signaturePlacementDrag.offsetX,
      state.signaturePlacementDrag.offsetY
    );
  }

  function endSignaturePlacementDrag(event) {
    if (!state.signaturePlacementDrag) return;

    state.signaturePlacementDrag = null;
    els.signaturePlacementPreview.classList.remove("is-dragging");

    if (els.signaturePlacementPreview.releasePointerCapture) {
      try {
        els.signaturePlacementPreview.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture may already be released by the browser.
      }
    }
  }

  function placeSignaturePreviewAtPoint(event) {
    if (!isSignatureFullPlacementMode()) return;
    if (event.target === els.signaturePlacementPreview || els.signaturePlacementPreview.contains(event.target)) return;
    if (els.signaturePlacementPreview.hidden) return;

    moveSignaturePlacementToPoint(
      event.clientX,
      event.clientY,
      els.signaturePlacementPreview.offsetWidth / 2,
      els.signaturePlacementPreview.offsetHeight / 2
    );
  }

  function moveSignaturePlacementToPoint(clientX, clientY, offsetX, offsetY) {
    const stageRect = els.signatureFullStage.getBoundingClientRect();
    const preview = els.signaturePlacementPreview;
    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    const maxLeft = Math.max(0, stageRect.width - width);
    const maxTop = Math.max(0, stageRect.height - height);
    const left = clamp(clientX - stageRect.left - offsetX, 0, maxLeft);
    const top = clamp(clientY - stageRect.top - offsetY, 0, maxTop);

    preview.style.left = `${left}px`;
    preview.style.top = `${top}px`;
    syncCustomSignaturePosition(left, top, width, height, stageRect.width, stageRect.height);
  }

  function syncCustomSignaturePosition(left, top, width, height, stageWidth, stageHeight) {
    const maxLeft = Math.max(1, stageWidth - width);
    const maxTop = Math.max(1, stageHeight - height);
    const customX = clamp((left / maxLeft) * 100, 0, 100);
    const customY = clamp(((stageHeight - height - top) / maxTop) * 100, 0, 100);

    els.signaturePosition.value = "custom";
    els.signatureX.value = String(Math.round(customX));
    els.signatureY.value = String(Math.round(customY));
    updateSignaturePositionControls();
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
  }

  async function editPdfMetadata() {
    if (!hasPdfLib()) {
      showMessage("metadata", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.metadataFile) {
      showMessage("metadata", "Select one PDF file to edit metadata.", "error");
      return;
    }

    const settings = getMetadataSettings();
    const clearBusy = setBusy(els.metadataButton, "Updating...");

    try {
      const { PDFDocument } = window.PDFLib;
      showProgress("metadata", "Updating metadata", 0, 4, `Reading ${state.metadataFile.name}`);
      const originalBytes = new Uint8Array(await state.metadataFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes, {
          updateMetadata: false
        });
      } catch (error) {
        throw addFileContext(error, state.metadataFile);
      }

      showProgress("metadata", "Updating metadata", 2, 4, "Writing document information");
      pdfDoc.setTitle(settings.title);
      pdfDoc.setAuthor(settings.author);
      pdfDoc.setSubject(settings.subject);
      pdfDoc.setKeywords(settings.keywords);
      pdfDoc.setCreator("PDFNest");
      pdfDoc.setProducer("PDFNest");
      pdfDoc.setModificationDate(new Date());

      showProgress("metadata", "Updating metadata", 3, 4, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        objectsPerTick: 50,
        useObjectStreams: true
      });
      setDownload(
        "metadata",
        pdfBytes,
        `${sanitizeName(state.metadataFile.name)}-metadata.pdf`,
        "Download metadata PDF"
      );
    } catch (error) {
      showMessage("metadata", formatPdfError("Could not update PDF metadata.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getMetadataSettings() {
    return {
      author: safePdfText(els.metadataAuthor.value).trim(),
      keywords: getMetadataKeywords(els.metadataKeywords.value),
      subject: safePdfText(els.metadataSubject.value).trim(),
      title: safePdfText(els.metadataTitle.value).trim()
    };
  }

  function getMetadataKeywords(value) {
    return safePdfText(value)
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean)
      .slice(0, 30);
  }

  async function annotatePdf() {
    if (!hasPdfLib()) {
      showMessage("annotate", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.annotateFile) {
      showMessage("annotate", "Select one PDF file to annotate.", "error");
      return;
    }

    const settings = getAnnotationSettings();

    if (settings.type === "text" && !settings.text) {
      showMessage("annotate", "Enter text for the note before annotating.", "error");
      return;
    }

    if (settings.type === "draw" && !state.annotationHasInk) {
      showMessage("annotate", "Draw in the freehand pad before adding a drawing annotation.", "error");
      return;
    }

    const clearBusy = setBusy(els.annotateButton, "Annotating...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      showProgress("annotate", "Annotating PDF", 0, 4, `Reading ${state.annotateFile.name}`);
      const originalBytes = new Uint8Array(await state.annotateFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.annotateFile);
      }

      const pages = pdfDoc.getPages();

      if (!pages.length) {
        throw new Error("This PDF has no pages.");
      }

      const pageIndex = clamp(settings.pageNumber - 1, 0, pages.length - 1);
      const page = pages[pageIndex];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      showProgress("annotate", "Annotating PDF", 2, 4, `Adding annotation to page ${pageIndex + 1}`);
      await drawAnnotationOnPage(pdfDoc, page, font, settings);
      showProgress("annotate", "Annotating PDF", 3, 4, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        useObjectStreams: true
      });
      setDownload(
        "annotate",
        pdfBytes,
        `${sanitizeName(state.annotateFile.name)}-annotated.pdf`,
        "Download annotated PDF"
      );
    } catch (error) {
      showMessage("annotate", formatPdfError("Could not annotate this PDF.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getAnnotationSettings() {
    const pageNumber = Math.round(Number(els.annotatePage.value));
    const fontSize = Number(els.annotateFontSize.value);
    const opacity = Number(els.annotateOpacity.value);
    const x = Number(els.annotateX.value);
    const y = Number(els.annotateY.value);
    const width = Number(els.annotateWidth.value);
    const height = Number(els.annotateHeight.value);

    return {
      color: els.annotateColor.value || "#f59e0b",
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 8, 48) : 14,
      heightPercent: Number.isFinite(height) ? clamp(height, 3, 80) : 10,
      opacity: (Number.isFinite(opacity) ? clamp(opacity, 10, 100) : 35) / 100,
      pageNumber: Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1,
      text: safePdfText(els.annotateText.value).trim(),
      type: els.annotateType.value,
      widthPercent: Number.isFinite(width) ? clamp(width, 5, 100) : 38,
      xPercent: Number.isFinite(x) ? clamp(x, 0, 100) : 12,
      yPercent: Number.isFinite(y) ? clamp(y, 0, 100) : 72
    };
  }

  async function drawAnnotationOnPage(pdfDoc, page, font, settings) {
    const color = hexToPdfColor(settings.color);
    const rect = getAnnotationRect(page, settings);

    if (settings.type === "highlight") {
      page.drawRectangle({
        color,
        height: rect.height,
        opacity: settings.opacity,
        width: rect.width,
        x: rect.x,
        y: rect.y
      });
      return;
    }

    if (settings.type === "rectangle") {
      page.drawRectangle({
        borderColor: color,
        borderOpacity: Math.max(settings.opacity, 0.45),
        borderWidth: 2,
        height: rect.height,
        width: rect.width,
        x: rect.x,
        y: rect.y
      });
      return;
    }

    if (settings.type === "draw") {
      const pngBytes = dataUrlToUint8Array(els.annotationCanvas.toDataURL("image/png"));
      const drawingImage = await pdfDoc.embedPng(pngBytes);
      const imageRatio = drawingImage.height / Math.max(drawingImage.width, 1);
      const imageHeight = Math.min(rect.height, rect.width * imageRatio);
      page.drawImage(drawingImage, {
        height: imageHeight,
        opacity: Math.max(settings.opacity, 0.65),
        width: rect.width,
        x: rect.x,
        y: rect.y + Math.max(0, rect.height - imageHeight)
      });
      return;
    }

    const lines = wrapTextToWidth(settings.text, font, settings.fontSize, rect.width);
    const lineHeight = settings.fontSize * 1.25;
    const maxLines = Math.max(1, Math.floor(rect.height / lineHeight));
    lines.slice(0, maxLines).forEach((line, index) => {
      page.drawText(line, {
        color,
        font,
        opacity: Math.max(settings.opacity, 0.7),
        size: settings.fontSize,
        x: rect.x,
        y: rect.y + rect.height - settings.fontSize - (index * lineHeight)
      });
    });
  }

  function getAnnotationRect(page, settings) {
    const { width, height } = page.getSize();
    const rectWidth = clamp((settings.widthPercent / 100) * width, 24, width);
    const rectHeight = clamp((settings.heightPercent / 100) * height, 18, height);
    const maxX = Math.max(0, width - rectWidth);
    const maxY = Math.max(0, height - rectHeight);

    return {
      height: rectHeight,
      width: rectWidth,
      x: clamp((settings.xPercent / 100) * maxX, 0, maxX),
      y: clamp((settings.yPercent / 100) * maxY, 0, maxY)
    };
  }

  function hexToPdfColor(hex) {
    const { rgb } = window.PDFLib;
    const normalized = String(hex || "#f59e0b").replace("#", "");
    const value = /^[0-9a-f]{6}$/i.test(normalized) ? normalized : "f59e0b";
    const red = parseInt(value.slice(0, 2), 16) / 255;
    const green = parseInt(value.slice(2, 4), 16) / 255;
    const blue = parseInt(value.slice(4, 6), 16) / 255;
    return rgb(red, green, blue);
  }

  async function flattenPdf() {
    if (!hasPdfJs() || !hasPdfLib()) {
      showMessage("flatten", "The local PDF libraries did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.flattenFile) {
      showMessage("flatten", "Select one PDF file to flatten.", "error");
      return;
    }

    const clearBusy = setBusy(els.flattenButton, "Flattening...");
    let pdf;

    try {
      const { PDFDocument } = window.PDFLib;
      const scale = getFlattenScale();
      const file = state.flattenFile;
      showProgress("flatten", "Opening PDF", 0, 1, file.name);

      try {
        pdf = await loadPdfJsDocument(file, "flatten visible pages");
      } catch (error) {
        throw addFileContext(error, file);
      }

      const outputPdf = await PDFDocument.create();

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        showProgress("flatten", "Flattening PDF", pageNumber - 1, pdf.numPages, `Rendering page ${pageNumber}`);
        await renderFlattenedPage(pdf, outputPdf, pageNumber, scale);
        showProgress("flatten", "Flattening PDF", pageNumber, pdf.numPages, `Flattened page ${pageNumber}`);
      }

      const pdfBytes = await outputPdf.save({
        addDefaultPage: false,
        useObjectStreams: true
      });
      setDownload(
        "flatten",
        pdfBytes,
        `${sanitizeName(file.name)}-flattened.pdf`,
        "Download flattened PDF"
      );
    } catch (error) {
      showMessage("flatten", formatPdfError("Could not flatten this PDF.", error), "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }

      clearBusy();
    }
  }

  function getFlattenScale() {
    const scale = Number(els.flattenScale.value);
    return Number.isFinite(scale) ? clamp(scale, 1, 2) : 1.5;
  }

  async function renderFlattenedPage(pdf, outputPdf, pageNumber, scale) {
    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const renderViewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(renderViewport.width);
    canvas.height = Math.ceil(renderViewport.height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport: renderViewport
    }).promise;

    const imageBytes = await canvasToBytes(canvas, "image/png");
    const embeddedImage = await outputPdf.embedPng(imageBytes);
    const outputPage = outputPdf.addPage([baseViewport.width, baseViewport.height]);
    outputPage.drawImage(embeddedImage, {
      height: baseViewport.height,
      width: baseViewport.width,
      x: 0,
      y: 0
    });

    if (page.cleanup) {
      page.cleanup();
    }
  }

  async function cropPdf() {
    if (!hasPdfLib()) {
      showMessage("crop", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.cropFile) {
      showMessage("crop", "Select one PDF file to crop.", "error");
      return;
    }

    const clearBusy = setBusy(els.cropButton, "Cropping...");

    try {
      const { PDFDocument } = window.PDFLib;
      const settings = getCropSettings();
      showProgress("crop", "Cropping PDF", 0, 3, `Reading ${state.cropFile.name}`);
      const originalBytes = new Uint8Array(await state.cropFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.cropFile);
      }

      const pages = pdfDoc.getPages();

      if (!pages.length) {
        throw new Error("This PDF has no pages.");
      }

      const pageIndexes = getCropPageIndexes(settings.pageMode, pages.length);
      showProgress("crop", "Cropping PDF", 1, 3, `Cropping ${pageIndexes.length} page${pageIndexes.length === 1 ? "" : "s"}`);
      pageIndexes.forEach((pageIndex) => {
        applyCropToPage(pages[pageIndex], settings);
      });

      showProgress("crop", "Cropping PDF", 2, 3, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        useObjectStreams: true
      });
      setDownload(
        "crop",
        pdfBytes,
        `${sanitizeName(state.cropFile.name)}-cropped.pdf`,
        "Download cropped PDF"
      );
    } catch (error) {
      showMessage("crop", formatPdfError("Could not crop this PDF.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getCropSettings() {
    const checkedMode = document.querySelector("input[name='cropPages']:checked");

    return {
      bottom: getCropPercent(els.cropBottom.value),
      left: getCropPercent(els.cropLeft.value),
      pageMode: checkedMode ? checkedMode.value : "all",
      right: getCropPercent(els.cropRight.value),
      top: getCropPercent(els.cropTop.value)
    };
  }

  function getCropPercent(value) {
    const number = Number(value);
    return Number.isFinite(number) ? clamp(number, 0, 45) : 0;
  }

  function getCropPageIndexes(mode, pageCount) {
    if (mode === "range") {
      return parsePageSelection(els.cropPageSelection.value, pageCount);
    }

    return Array.from({ length: pageCount }, (_, index) => index);
  }

  function applyCropToPage(page, settings) {
    if (typeof page.setCropBox !== "function") {
      throw new Error("This PDF library build does not support crop boxes.");
    }

    const { width, height } = page.getSize();
    const left = (settings.left / 100) * width;
    const right = (settings.right / 100) * width;
    const bottom = (settings.bottom / 100) * height;
    const top = (settings.top / 100) * height;
    const cropWidth = width - left - right;
    const cropHeight = height - top - bottom;

    if (cropWidth < 36 || cropHeight < 36) {
      throw new Error("Crop margins are too large for at least one page.");
    }

    page.setCropBox(left, bottom, cropWidth, cropHeight);
  }

  async function addTextToPdf() {
    if (!hasPdfLib()) {
      showMessage("addText", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.addTextFile) {
      showMessage("addText", "Select one PDF file before adding text.", "error");
      return;
    }

    const settings = getAddTextSettings();

    if (!settings.text) {
      showMessage("addText", "Type text before adding it to the PDF.", "error");
      return;
    }

    const clearBusy = setBusy(els.addTextButton, "Adding...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      showProgress("addText", "Adding text", 0, 4, `Reading ${state.addTextFile.name}`);
      const originalBytes = new Uint8Array(await state.addTextFile.arrayBuffer());
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(originalBytes);
      } catch (error) {
        throw addFileContext(error, state.addTextFile);
      }

      const pages = pdfDoc.getPages();

      if (!pages.length) {
        throw new Error("This PDF has no pages.");
      }

      const pageIndex = clamp(settings.pageNumber - 1, 0, pages.length - 1);
      const page = pages[pageIndex];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      showProgress("addText", "Adding text", 2, 4, `Writing text on page ${pageIndex + 1}`);
      drawAddedTextOnPage(page, font, settings);
      showProgress("addText", "Adding text", 3, 4, "Preparing download");
      const pdfBytes = await pdfDoc.save({
        addDefaultPage: false,
        useObjectStreams: true
      });
      setDownload(
        "addText",
        pdfBytes,
        `${sanitizeName(state.addTextFile.name)}-text.pdf`,
        "Download text-filled PDF"
      );
    } catch (error) {
      showMessage("addText", formatPdfError("Could not add text to this PDF.", error), "error");
    } finally {
      clearBusy();
    }
  }

  function getAddTextSettings() {
    const pageNumber = Math.round(Number(els.addTextPage.value));
    const fontSize = Number(els.addTextFontSize.value);
    const x = Number(els.addTextX.value);
    const y = Number(els.addTextY.value);
    const width = Number(els.addTextWidth.value);

    return {
      color: els.addTextColor.value || "#111827",
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 6, 48) : 12,
      pageNumber: Number.isFinite(pageNumber) && pageNumber > 0 ? pageNumber : 1,
      text: getSafeMultilinePdfText(els.addTextValue.value),
      widthPercent: Number.isFinite(width) ? clamp(width, 10, 100) : 45,
      xPercent: Number.isFinite(x) ? clamp(x, 0, 100) : 12,
      yPercent: Number.isFinite(y) ? clamp(y, 0, 100) : 70
    };
  }

  function getSafeMultilinePdfText(value) {
    return String(value == null ? "" : value)
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .split("\n")
      .map((line) => safePdfText(line).trim())
      .join("\n")
      .trim();
  }

  function drawAddedTextOnPage(page, font, settings) {
    const { width, height } = page.getSize();
    const boxWidth = clamp((settings.widthPercent / 100) * width, 24, width);
    const maxX = Math.max(0, width - boxWidth);
    const x = clamp((settings.xPercent / 100) * maxX, 0, maxX);
    let y = clamp((settings.yPercent / 100) * Math.max(1, height - settings.fontSize), 12, Math.max(12, height - settings.fontSize - 12));
    const lineHeight = settings.fontSize * 1.28;
    const color = hexToPdfColor(settings.color);
    const lines = settings.text.split("\n").flatMap((paragraph) => {
      if (!paragraph.trim()) {
        return [""];
      }

      return wrapTextToWidth(paragraph, font, settings.fontSize, boxWidth);
    });

    lines.forEach((line) => {
      if (y < 12) return;

      if (line) {
        page.drawText(line, {
          color,
          font,
          opacity: 0.95,
          size: settings.fontSize,
          x,
          y
        });
      }

      y -= lineHeight;
    });
  }

  async function removePdfPassword() {
    if (!hasPdfJs() || !hasPdfLib()) {
      showMessage("removePassword", "The local PDF libraries did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.removePasswordFile) {
      showMessage("removePassword", "Select one PDF file you can unlock.", "error");
      return;
    }

    const clearBusy = setBusy(els.removePasswordButton, "Unlocking...");
    let pdf;

    try {
      const { PDFDocument } = window.PDFLib;
      const scale = getRemovePasswordScale();
      const file = state.removePasswordFile;
      showProgress("removePassword", "Opening PDF", 0, 1, file.name);

      try {
        pdf = await loadPdfJsDocument(file, "remove the password");
      } catch (error) {
        throw addFileContext(error, file);
      }

      const outputPdf = await PDFDocument.create();

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        showProgress("removePassword", "Removing password", pageNumber - 1, pdf.numPages, `Rendering page ${pageNumber}`);
        await renderFlattenedPage(pdf, outputPdf, pageNumber, scale);
        showProgress("removePassword", "Removing password", pageNumber, pdf.numPages, `Copied page ${pageNumber}`);
      }

      const pdfBytes = await outputPdf.save({
        addDefaultPage: false,
        useObjectStreams: true
      });
      setDownload(
        "removePassword",
        pdfBytes,
        `${sanitizeName(file.name)}-unlocked.pdf`,
        "Download unlocked PDF"
      );
    } catch (error) {
      showMessage("removePassword", formatPdfError("Could not remove the PDF password.", error), "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }

      clearBusy();
    }
  }

  function getRemovePasswordScale() {
    const scale = Number(els.removePasswordScale.value);
    return Number.isFinite(scale) ? clamp(scale, 1, 2) : 1.5;
  }

  function getSplitPageIndexes(mode, pageCount) {
    if (mode === "first") {
      return [0];
    }

    if (mode === "last") {
      return [pageCount - 1];
    }

    if (mode === "range") {
      return parsePageSelection(els.pageSelection.value, pageCount);
    }

    throw new Error("Choose a split preset.");
  }

  function getSplitSuffix(mode) {
    if (mode === "first") return "first-page";
    if (mode === "last") return "last-page";
    return "page-range";
  }

  function parsePageSelection(value, pageCount) {
    const text = value.trim();

    if (!text) {
      throw new Error("Enter page numbers such as 1, 3-5, 8.");
    }

    const indexes = [];
    const seen = new Set();
    const chunks = text.split(",");

    chunks.forEach((chunk) => {
      const part = chunk.trim();

      if (!part) {
        throw new Error("Remove empty page entries from the selection.");
      }

      if (part.includes("-")) {
        const range = part.split("-").map((item) => Number(item.trim()));

        if (range.length !== 2 || range.some((item) => !Number.isInteger(item))) {
          throw new Error(`Invalid range: ${part}.`);
        }

        const [start, end] = range;

        if (start < 1 || end < 1 || start > end || end > pageCount) {
          throw new Error(`Range ${part} is outside this ${pageCount}-page PDF.`);
        }

        for (let page = start; page <= end; page += 1) {
          addPageIndex(page - 1, indexes, seen);
        }
      } else {
        const page = Number(part);

        if (!Number.isInteger(page) || page < 1 || page > pageCount) {
          throw new Error(`Page ${part} is outside this ${pageCount}-page PDF.`);
        }

        addPageIndex(page - 1, indexes, seen);
      }
    });

    if (!indexes.length) {
      throw new Error("Enter at least one page number.");
    }

    return indexes;
  }

  function addPageIndex(index, indexes, seen) {
    if (!seen.has(index)) {
      indexes.push(index);
      seen.add(index);
    }
  }

  async function spreadsheetsToPdf() {
    if (!hasPdfLib()) {
      showMessage("spreadsheet", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.spreadsheetFiles.length) {
      showMessage("spreadsheet", "Select at least one XLSX or CSV file.", "error");
      return;
    }

    if (state.spreadsheetFiles.some(isXlsxFile) && !hasZipLib()) {
      showMessage("spreadsheet", "The local ZIP library did not load, so XLSX files cannot be read. Refresh this page, then try again.", "error");
      return;
    }

    const clearBusy = setBusy(els.spreadsheetButton, "Converting...");

    try {
      const workbooks = [];
      const totalFiles = state.spreadsheetFiles.length;

      for (const [index, file] of state.spreadsheetFiles.entries()) {
        showProgress("spreadsheet", "Reading spreadsheets", index, totalFiles, `Reading ${file.name}`);
        workbooks.push(await parseSpreadsheetFile(file));
        showProgress("spreadsheet", "Reading spreadsheets", index + 1, totalFiles, `Loaded ${file.name}`);
      }

      const sheetItems = workbooks.flatMap((workbook) => {
        return workbook.sheets.map((sheet) => ({
          fileName: workbook.fileName,
          sheet
        }));
      });

      if (!sheetItems.length) {
        throw new Error("No readable sheets were found.");
      }

      const { PDFDocument, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const fonts = {
        bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        regular: await pdfDoc.embedFont(StandardFonts.Helvetica)
      };
      const settings = getSpreadsheetPdfSettings();

      for (const [index, item] of sheetItems.entries()) {
        showProgress(
          "spreadsheet",
          "Creating spreadsheet PDF",
          index,
          sheetItems.length,
          `${item.fileName} - ${item.sheet.name}`
        );
        renderSpreadsheetSheet(pdfDoc, fonts, item, settings);
      }

      showProgress("spreadsheet", "Creating spreadsheet PDF", sheetItems.length, sheetItems.length, "Preparing download");
      const pdfBytes = await pdfDoc.save();
      const filename = state.spreadsheetFiles.length === 1
        ? `${sanitizeName(state.spreadsheetFiles[0].name)}.pdf`
        : "spreadsheets.pdf";
      setDownload("spreadsheet", pdfBytes, filename, "Download spreadsheet PDF");
    } catch (error) {
      showMessage("spreadsheet", `Could not convert spreadsheet. ${error.message}`, "error");
    } finally {
      clearBusy();
    }
  }

  async function parseSpreadsheetFile(file) {
    if (isCsvFile(file)) {
      return {
        fileName: file.name,
        sheets: [{
          name: "CSV",
          rows: trimSpreadsheetRows(parseCsvRows(await file.text()))
        }]
      };
    }

    if (isXlsxFile(file)) {
      return parseXlsxWorkbook(file);
    }

    throw new Error(`${file.name} is not a supported XLSX or CSV file.`);
  }

  async function parseXlsxWorkbook(file) {
    if (!window.DOMParser) {
      throw new Error("This browser cannot parse XLSX worksheet data.");
    }

    const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
    const workbookXml = await readZipText(zip, "xl/workbook.xml");
    const workbookDoc = parseXml(workbookXml, "workbook.xml");
    const relsDoc = parseXml(await readZipText(zip, "xl/_rels/workbook.xml.rels"), "workbook relationships");
    const relationships = getWorkbookRelationships(relsDoc);
    const sharedStrings = await readSharedStrings(zip);
    const sheetNodes = Array.from(workbookDoc.getElementsByTagName("sheet"));
    const sheets = [];

    for (const [index, sheetNode] of sheetNodes.entries()) {
      const relId = sheetNode.getAttribute("r:id");
      const target = relationships.get(relId) || `worksheets/sheet${index + 1}.xml`;
      const sheetPath = resolveXlsxPath("xl", target);
      const sheetFile = zip.file(sheetPath);

      if (!sheetFile) {
        continue;
      }

      const worksheetDoc = parseXml(await sheetFile.async("text"), sheetPath);
      sheets.push({
        name: sheetNode.getAttribute("name") || `Sheet ${index + 1}`,
        rows: trimSpreadsheetRows(readWorksheetRows(worksheetDoc, sharedStrings))
      });
    }

    return {
      fileName: file.name,
      sheets
    };
  }

  async function readSharedStrings(zip) {
    const entry = zip.file("xl/sharedStrings.xml");

    if (!entry) {
      return [];
    }

    const doc = parseXml(await entry.async("text"), "sharedStrings.xml");
    return Array.from(doc.getElementsByTagName("si")).map((node) => normalizeSpreadsheetCell(node.textContent || ""));
  }

  function getWorkbookRelationships(doc) {
    const relationships = new Map();

    Array.from(doc.getElementsByTagName("Relationship")).forEach((node) => {
      const id = node.getAttribute("Id");
      const target = node.getAttribute("Target");

      if (id && target) {
        relationships.set(id, target);
      }
    });

    return relationships;
  }

  async function readZipText(zip, path) {
    const entry = zip.file(path);

    if (!entry) {
      throw new Error(`The XLSX file is missing ${path}.`);
    }

    return entry.async("text");
  }

  function parseXml(text, label) {
    const doc = new DOMParser().parseFromString(text, "application/xml");

    if (doc.getElementsByTagName("parsererror").length) {
      throw new Error(`Could not read ${label}.`);
    }

    return doc;
  }

  function resolveXlsxPath(baseDir, target) {
    if (target.startsWith("/")) {
      return normalizeZipPath(target.slice(1));
    }

    return normalizeZipPath(`${baseDir}/${target}`);
  }

  function normalizeZipPath(path) {
    const parts = [];

    path.split("/").forEach((part) => {
      if (!part || part === ".") return;

      if (part === "..") {
        parts.pop();
      } else {
        parts.push(part);
      }
    });

    return parts.join("/");
  }

  function readWorksheetRows(doc, sharedStrings) {
    const rows = [];
    const rowNodes = Array.from(doc.getElementsByTagName("row"));

    rowNodes.forEach((rowNode, fallbackRowIndex) => {
      const rowIndex = Math.max(0, Number(rowNode.getAttribute("r")) - 1) || fallbackRowIndex;
      const row = [];

      Array.from(rowNode.getElementsByTagName("c")).forEach((cellNode) => {
        const ref = cellNode.getAttribute("r") || "";
        const columnIndex = ref ? columnIndexFromCellRef(ref) : row.length;
        row[columnIndex] = readXlsxCell(cellNode, sharedStrings);
      });

      rows[rowIndex] = row;
    });

    return rows.map((row) => row || []);
  }

  function readXlsxCell(cellNode, sharedStrings) {
    const type = cellNode.getAttribute("t");

    if (type === "inlineStr") {
      const inlineString = cellNode.getElementsByTagName("is")[0];
      return normalizeSpreadsheetCell(inlineString ? inlineString.textContent || "" : "");
    }

    const valueNode = cellNode.getElementsByTagName("v")[0];
    const value = valueNode ? valueNode.textContent || "" : "";

    if (type === "s") {
      return normalizeSpreadsheetCell(sharedStrings[Number(value)] || "");
    }

    if (type === "b") {
      return value === "1" ? "TRUE" : "FALSE";
    }

    return normalizeSpreadsheetCell(value);
  }

  function columnIndexFromCellRef(ref) {
    const match = ref.match(/[A-Z]+/i);

    if (!match) {
      return 0;
    }

    return match[0].toUpperCase().split("").reduce((total, char) => {
      return total * 26 + char.charCodeAt(0) - 64;
    }, 0) - 1;
  }

  function parseCsvRows(text) {
    const rows = [];
    let row = [];
    let value = "";
    let inQuotes = false;
    const source = text.replace(/^\uFEFF/, "");

    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];

      if (inQuotes) {
        if (char === "\"" && source[index + 1] === "\"") {
          value += "\"";
          index += 1;
        } else if (char === "\"") {
          inQuotes = false;
        } else {
          value += char;
        }
      } else if (char === "\"") {
        inQuotes = true;
      } else if (char === ",") {
        row.push(value);
        value = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && source[index + 1] === "\n") {
          index += 1;
        }

        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      } else {
        value += char;
      }
    }

    if (value || row.length) {
      row.push(value);
      rows.push(row);
    }

    return rows;
  }

  function trimSpreadsheetRows(rows) {
    const normalizedRows = rows.map((row) => {
      const cells = (row || []).map(normalizeSpreadsheetCell);

      while (cells.length && !cells[cells.length - 1]) {
        cells.pop();
      }

      return cells;
    });

    while (normalizedRows.length && !normalizedRows[normalizedRows.length - 1].length) {
      normalizedRows.pop();
    }

    return normalizedRows;
  }

  function normalizeSpreadsheetCell(value) {
    return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
  }

  function getSpreadsheetPdfSettings() {
    const margin = Number(els.spreadsheetMargin.value);

    return {
      fitWidth: els.spreadsheetFitWidth.checked,
      gridlines: els.spreadsheetGridlines.checked,
      margin: Number.isFinite(margin) ? clamp(margin, 12, 72) : 30,
      orientation: els.spreadsheetOrientation.value,
      pageSize: els.spreadsheetPageSize.value
    };
  }

  function renderSpreadsheetSheet(pdfDoc, fonts, item, settings) {
    const prepared = prepareSpreadsheetRows(item.sheet.rows);
    const rows = prepared.rows;
    const dimensions = applyOrientation(pageSizes[settings.pageSize].slice(), settings.orientation);
    const [pageWidth, pageHeight] = dimensions;
    const margin = Math.min(settings.margin, Math.max(12, (Math.min(pageWidth, pageHeight) - 120) / 2));
    const contentWidth = pageWidth - margin * 2;
    const fontSize = settings.fitWidth ? 7 : 8;
    const rowHeight = 18;
    const titleSize = 11;
    const noteSize = 7;
    const colCount = Math.max(1, ...rows.map((row) => row.length));
    const columnWidths = getSpreadsheetColumnWidths(rows, colCount, fonts.regular, fontSize, contentWidth, settings.fitWidth);
    const note = getSpreadsheetLimitNote(prepared);
    let page;
    let y;

    function startPage() {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      page.drawText(fitTextToWidth(safePdfText(`${item.fileName} - ${item.sheet.name}`), fonts.bold, titleSize, contentWidth), {
        color: window.PDFLib.rgb(0.08, 0.12, 0.1),
        font: fonts.bold,
        size: titleSize,
        x: margin,
        y: y - titleSize
      });
      y -= 22;

      if (note) {
        page.drawText(fitTextToWidth(note, fonts.regular, noteSize, contentWidth), {
          color: window.PDFLib.rgb(0.38, 0.43, 0.4),
          font: fonts.regular,
          size: noteSize,
          x: margin,
          y: y - noteSize
        });
        y -= 14;
      }

      if (rows.length) {
        drawSpreadsheetRow(page, rows[0], columnWidths, margin, y, rowHeight, fonts.bold, fontSize, true, settings.gridlines);
        y -= rowHeight;
      }
    }

    startPage();

    if (!rows.length) {
      page.drawText("No rows found in this sheet.", {
        color: window.PDFLib.rgb(0.38, 0.43, 0.4),
        font: fonts.regular,
        size: 9,
        x: margin,
        y: y - 16
      });
      return;
    }

    rows.slice(1).forEach((row) => {
      if (y - rowHeight < margin) {
        startPage();
      }

      drawSpreadsheetRow(page, row, columnWidths, margin, y, rowHeight, fonts.regular, fontSize, false, settings.gridlines);
      y -= rowHeight;
    });
  }

  function prepareSpreadsheetRows(rows) {
    const cleaned = trimSpreadsheetRows(rows);
    const originalColumnCount = Math.max(0, ...cleaned.map((row) => row.length));
    const columnCount = Math.min(originalColumnCount || 1, spreadsheetLimits.columns);
    const limitedRows = cleaned.slice(0, spreadsheetLimits.rows).map((row) => row.slice(0, columnCount));

    return {
      rows: limitedRows,
      truncatedColumns: originalColumnCount > spreadsheetLimits.columns,
      truncatedRows: cleaned.length > spreadsheetLimits.rows
    };
  }

  function getSpreadsheetLimitNote(prepared) {
    const notes = [];

    if (prepared.truncatedRows) {
      notes.push(`showing first ${spreadsheetLimits.rows} rows`);
    }

    if (prepared.truncatedColumns) {
      notes.push(`showing first ${spreadsheetLimits.columns} columns`);
    }

    return notes.length ? `Large sheet trimmed for browser performance: ${notes.join(", ")}.` : "";
  }

  function getSpreadsheetColumnWidths(rows, colCount, font, fontSize, contentWidth, fitWidth) {
    const widths = Array.from({ length: colCount }, (_, columnIndex) => {
      const sampleRows = rows.slice(0, 80);
      const measured = sampleRows.reduce((maxWidth, row) => {
        const text = safePdfText(row[columnIndex] || "");
        return Math.max(maxWidth, font.widthOfTextAtSize(text, fontSize) + 12);
      }, 42);

      return Math.min(Math.max(measured, 38), 150);
    });
    const totalWidth = widths.reduce((total, width) => total + width, 0);

    if (!fitWidth && totalWidth <= contentWidth) {
      return widths;
    }

    const scale = contentWidth / totalWidth;
    return widths.map((width) => Math.max(24, width * scale));
  }

  function drawSpreadsheetRow(page, row, columnWidths, startX, topY, height, font, fontSize, isHeader, showGridlines) {
    let x = startX;
    const fillColor = isHeader ? window.PDFLib.rgb(0.9, 0.96, 0.94) : undefined;
    const lineColor = window.PDFLib.rgb(0.78, 0.83, 0.8);
    const textColor = window.PDFLib.rgb(0.1, 0.13, 0.12);

    columnWidths.forEach((width, columnIndex) => {
      if (showGridlines || isHeader) {
        const rectangle = {
          height,
          width,
          x,
          y: topY - height
        };

        if (showGridlines) {
          rectangle.borderColor = lineColor;
          rectangle.borderWidth = 0.4;
        }

        if (fillColor) {
          rectangle.color = fillColor;
        }

        page.drawRectangle(rectangle);
      }

      const text = fitTextToWidth(row[columnIndex] || "", font, fontSize, width - 7);

      if (text) {
        page.drawText(text, {
          color: textColor,
          font,
          size: fontSize,
          x: x + 4,
          y: topY - height + 5
        });
      }

      x += width;
    });
  }

  function fitTextToWidth(value, font, fontSize, maxWidth) {
    const text = safePdfText(value);

    if (!text || font.widthOfTextAtSize(text, fontSize) <= maxWidth) {
      return text;
    }

    const ellipsis = "...";
    const ellipsisWidth = font.widthOfTextAtSize(ellipsis, fontSize);
    let output = text;

    while (output && font.widthOfTextAtSize(output, fontSize) + ellipsisWidth > maxWidth) {
      output = output.slice(0, -1);
    }

    return output ? `${output.trimEnd()}${ellipsis}` : "";
  }

  function safePdfText(value) {
    return String(value == null ? "" : value)
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/[^\u0020-\u007E\u00A0-\u00FF]/g, "?");
  }

  async function wordToPdf() {
    if (!hasPdfLib()) {
      showMessage("word", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!hasZipLib()) {
      showMessage("word", "The local ZIP library did not load, so DOCX files cannot be read. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.wordFiles.length) {
      showMessage("word", "Select at least one DOCX file.", "error");
      return;
    }

    const clearBusy = setBusy(els.wordButton, "Converting...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const fonts = {
        bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        regular: await pdfDoc.embedFont(StandardFonts.Helvetica)
      };
      const settings = getWordPdfSettings();

      for (const [index, file] of state.wordFiles.entries()) {
        showProgress("word", "Reading Word files", index, state.wordFiles.length, `Reading ${file.name}`);
        const document = await parseDocxFile(file);
        showProgress("word", "Creating Word PDF", index, state.wordFiles.length, `Adding ${file.name}`);
        renderDocxDocument(pdfDoc, fonts, document, settings);
        showProgress("word", "Creating Word PDF", index + 1, state.wordFiles.length, `Added ${file.name}`);
      }

      showProgress("word", "Creating Word PDF", state.wordFiles.length, state.wordFiles.length, "Preparing download");
      const pdfBytes = await pdfDoc.save();
      const filename = state.wordFiles.length === 1
        ? `${sanitizeName(state.wordFiles[0].name)}.pdf`
        : "word-files.pdf";
      setDownload("word", pdfBytes, filename, "Download Word PDF");
    } catch (error) {
      showMessage("word", `Could not convert Word files. ${error.message}`, "error");
    } finally {
      clearBusy();
    }
  }

  async function parseDocxFile(file) {
    const zip = await window.JSZip.loadAsync(await file.arrayBuffer());
    const doc = parseXml(await readZipText(zip, "word/document.xml"), "word/document.xml");
    const body = getXmlFirstDescendant(doc, "body");

    if (!body) {
      throw new Error(`${file.name} does not contain a readable Word document body.`);
    }

    const blocks = getXmlChildren(body).flatMap((node) => {
      const name = getXmlLocalName(node);

      if (name === "p") {
        return [readDocxParagraph(node)];
      }

      if (name === "tbl") {
        const table = readDocxTable(node);
        return table.rows.length ? [table] : [];
      }

      return [];
    }).filter((block) => {
      if (block.type === "space") return true;
      if (block.type === "table") return block.rows.length;
      return Boolean(block.text);
    });

    return {
      blocks: blocks.length ? blocks : [{ text: "No readable text was found in this DOCX file.", type: "paragraph" }],
      fileName: file.name
    };
  }

  function readDocxParagraph(node) {
    const style = getDocxParagraphStyle(node);
    const text = normalizeDocxText(readDocxText(node));

    if (!text) {
      return { type: "space" };
    }

    if (/^(title|heading)/i.test(style)) {
      const levelMatch = style.match(/\d+/);
      return {
        level: levelMatch ? clamp(Number(levelMatch[0]), 1, 4) : 1,
        text,
        type: "heading"
      };
    }

    return {
      list: Boolean(getXmlFirstDescendant(getXmlFirstChild(node, "pPr"), "numPr")),
      text,
      type: "paragraph"
    };
  }

  function getDocxParagraphStyle(node) {
    const paragraphProperties = getXmlFirstChild(node, "pPr");
    const styleNode = paragraphProperties ? getXmlFirstChild(paragraphProperties, "pStyle") : null;
    return styleNode ? getXmlValue(styleNode) : "";
  }

  function readDocxTable(node) {
    const rows = getXmlChildren(node, "tr").map((rowNode) => {
      return getXmlChildren(rowNode, "tc").map((cellNode) => {
        const paragraphs = getXmlChildren(cellNode, "p")
          .map((paragraphNode) => normalizeDocxText(readDocxText(paragraphNode)))
          .filter(Boolean);
        return paragraphs.join(" ");
      });
    }).filter((row) => row.some(Boolean));

    return {
      rows,
      type: "table"
    };
  }

  function readDocxText(node) {
    return getXmlChildren(node).map((child) => {
      const name = getXmlLocalName(child);

      if (name === "pPr" || name === "tblPr" || name === "tcPr" || name === "trPr") {
        return "";
      }

      if (name === "t") {
        return child.textContent || "";
      }

      if (name === "tab") {
        return "\t";
      }

      if (name === "br" || name === "cr") {
        return "\n";
      }

      return readDocxText(child);
    }).join("");
  }

  function normalizeDocxText(value) {
    return String(value || "")
      .replace(/\u00A0/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s+/g, "\n")
      .trim();
  }

  function getWordPdfSettings() {
    const margin = Number(els.wordMargin.value);
    const fontSize = Number(els.wordFontSize.value);

    return {
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 8, 18) : 11,
      margin: Number.isFinite(margin) ? clamp(margin, 12, 96) : 42,
      orientation: els.wordOrientation.value,
      pageSize: els.wordPageSize.value
    };
  }

  function renderDocxDocument(pdfDoc, fonts, document, settings) {
    const dimensions = applyOrientation(pageSizes[settings.pageSize].slice(), settings.orientation);
    const [pageWidth, pageHeight] = dimensions;
    const margin = Math.min(settings.margin, Math.max(12, (Math.min(pageWidth, pageHeight) - 120) / 2));
    const contentWidth = pageWidth - margin * 2;
    const lineColor = window.PDFLib.rgb(0.78, 0.83, 0.8);
    const textColor = window.PDFLib.rgb(0.1, 0.13, 0.12);
    let page;
    let y;

    function startPage() {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      page.drawText(fitTextToWidth(document.fileName, fonts.bold, 12, contentWidth), {
        color: window.PDFLib.rgb(0.08, 0.12, 0.1),
        font: fonts.bold,
        size: 12,
        x: margin,
        y: y - 12
      });
      y -= 26;
    }

    function ensureSpace(height) {
      if (!page || y - height < margin) {
        startPage();
      }
    }

    function drawWrapped(text, font, size, indent) {
      const lineHeight = size * 1.38;
      const availableWidth = contentWidth - indent;
      const lines = wrapTextToWidth(text, font, size, availableWidth);

      lines.forEach((line) => {
        ensureSpace(lineHeight);

        if (line) {
          page.drawText(line, {
            color: textColor,
            font,
            size,
            x: margin + indent,
            y: y - size
          });
        }

        y -= lineHeight;
      });
    }

    function renderDocxTable(rows) {
      const fontSize = Math.max(7, settings.fontSize - 2);
      const rowHeight = fontSize * 1.9;
      const colCount = Math.max(1, ...rows.map((row) => row.length));
      const columnWidths = getSpreadsheetColumnWidths(rows, colCount, fonts.regular, fontSize, contentWidth, true);

      rows.forEach((row, index) => {
        if (y - rowHeight < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        drawSpreadsheetRow(page, row, columnWidths, margin, y, rowHeight, index === 0 ? fonts.bold : fonts.regular, fontSize, index === 0, true);

        if (index > 0) {
          page.drawLine({
            color: lineColor,
            end: { x: margin + contentWidth, y: y - rowHeight },
            start: { x: margin, y: y - rowHeight },
            thickness: 0.2
          });
        }

        y -= rowHeight;
      });

      y -= 8;
    }

    startPage();

    document.blocks.forEach((block) => {
      if (block.type === "space") {
        y -= settings.fontSize * 0.8;
        return;
      }

      if (block.type === "heading") {
        const size = settings.fontSize + Math.max(1, 6 - block.level);
        ensureSpace(size * 1.7);
        y -= 4;
        drawWrapped(block.text, fonts.bold, size, 0);
        y -= 3;
        return;
      }

      if (block.type === "table") {
        renderDocxTable(block.rows);
        return;
      }

      drawWrapped(block.list ? `- ${block.text}` : block.text, fonts.regular, settings.fontSize, block.list ? 12 : 0);
      y -= 2;
    });
  }

  function getXmlLocalName(node) {
    return node && (node.localName || String(node.nodeName || "").split(":").pop());
  }

  function getXmlChildren(node, localName) {
    if (!node) {
      return [];
    }

    return Array.from(node.childNodes || []).filter((child) => {
      return child.nodeType === 1 && (!localName || getXmlLocalName(child) === localName);
    });
  }

  function getXmlFirstChild(node, localName) {
    return getXmlChildren(node, localName)[0] || null;
  }

  function getXmlFirstDescendant(node, localName) {
    if (!node) {
      return null;
    }

    if (getXmlLocalName(node) === localName) {
      return node;
    }

    const descendants = node.getElementsByTagName ? Array.from(node.getElementsByTagName("*")) : [];
    return descendants.find((child) => getXmlLocalName(child) === localName) || null;
  }

  function getXmlValue(node) {
    return node.getAttribute("w:val")
      || node.getAttribute("val")
      || node.getAttribute("r:id")
      || "";
  }

  async function textToPdf() {
    if (!hasPdfLib()) {
      showMessage("text", "The PDF library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.textFiles.length) {
      showMessage("text", "Select at least one TXT file.", "error");
      return;
    }

    const clearBusy = setBusy(els.textButton, "Converting...");

    try {
      const { PDFDocument, StandardFonts } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const fonts = {
        bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        regular: await pdfDoc.embedFont(StandardFonts.Helvetica)
      };
      const settings = getTextPdfSettings();

      for (const [index, file] of state.textFiles.entries()) {
        showProgress("text", "Converting text", index, state.textFiles.length, `Reading ${file.name}`);
        const text = await file.text();
        renderTextFile(pdfDoc, fonts, file.name, text, settings);
        showProgress("text", "Converting text", index + 1, state.textFiles.length, `Added ${file.name}`);
      }

      showProgress("text", "Converting text", state.textFiles.length, state.textFiles.length, "Preparing download");
      const pdfBytes = await pdfDoc.save();
      const filename = state.textFiles.length === 1
        ? `${sanitizeName(state.textFiles[0].name)}.pdf`
        : "text-files.pdf";
      setDownload("text", pdfBytes, filename, "Download text PDF");
    } catch (error) {
      showMessage("text", `Could not convert text files. ${error.message}`, "error");
    } finally {
      clearBusy();
    }
  }

  function getTextPdfSettings() {
    const margin = Number(els.textMargin.value);
    const fontSize = Number(els.textFontSize.value);

    return {
      fontSize: Number.isFinite(fontSize) ? clamp(fontSize, 8, 18) : 11,
      margin: Number.isFinite(margin) ? clamp(margin, 12, 96) : 42,
      orientation: els.textOrientation.value,
      pageSize: els.textPageSize.value
    };
  }

  function renderTextFile(pdfDoc, fonts, fileName, text, settings) {
    const dimensions = applyOrientation(pageSizes[settings.pageSize].slice(), settings.orientation);
    const [pageWidth, pageHeight] = dimensions;
    const margin = Math.min(settings.margin, Math.max(12, (Math.min(pageWidth, pageHeight) - 120) / 2));
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = settings.fontSize * 1.42;
    const titleSize = 12;
    let page;
    let y;

    function startPage() {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      page.drawText(fitTextToWidth(fileName, fonts.bold, titleSize, contentWidth), {
        color: window.PDFLib.rgb(0.08, 0.12, 0.1),
        font: fonts.bold,
        size: titleSize,
        x: margin,
        y: y - titleSize
      });
      y -= titleSize + 14;
    }

    startPage();

    const normalizedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const paragraphs = normalizedText.split("\n");

    if (!normalizedText.trim()) {
      page.drawText("This text file is empty.", {
        color: window.PDFLib.rgb(0.38, 0.43, 0.4),
        font: fonts.regular,
        size: settings.fontSize,
        x: margin,
        y: y - lineHeight
      });
      return;
    }

    paragraphs.forEach((paragraph) => {
      const lines = paragraph.trim()
        ? wrapTextToWidth(paragraph, fonts.regular, settings.fontSize, contentWidth)
        : [""];

      lines.forEach((line) => {
        if (y - lineHeight < margin) {
          startPage();
        }

        if (line) {
          page.drawText(line, {
            color: window.PDFLib.rgb(0.1, 0.13, 0.12),
            font: fonts.regular,
            size: settings.fontSize,
            x: margin,
            y: y - settings.fontSize
          });
        }

        y -= lineHeight;
      });
    });
  }

  function wrapTextToWidth(value, font, fontSize, maxWidth) {
    const text = safePdfText(value).replace(/\t/g, "    ");

    if (!text) {
      return [""];
    }

    const words = text.split(/\s+/);
    const lines = [];
    let line = "";

    words.forEach((word) => {
      if (!word) return;

      const candidate = line ? `${line} ${word}` : word;

      if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
        line = candidate;
        return;
      }

      if (line) {
        lines.push(line);
      }

      line = fitLongWordToLines(word, font, fontSize, maxWidth, lines);
    });

    if (line) {
      lines.push(line);
    }

    return lines.length ? lines : [""];
  }

  function fitLongWordToLines(word, font, fontSize, maxWidth, lines) {
    if (font.widthOfTextAtSize(word, fontSize) <= maxWidth) {
      return word;
    }

    let chunk = "";

    Array.from(word).forEach((char) => {
      const candidate = `${chunk}${char}`;

      if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
        chunk = candidate;
      } else {
        if (chunk) {
          lines.push(chunk);
        }

        chunk = char;
      }
    });

    return chunk;
  }

  async function pdfToImages() {
    if (!hasPdfJs()) {
      showMessage("pdfImage", "The local PDF preview library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.pdfImageFile) {
      showMessage("pdfImage", "Select one PDF file to export.", "error");
      return;
    }

    const clearBusy = setBusy(els.pdfImageButton, "Exporting...");
    let pdf;

    try {
      const settings = getPdfImageSettings();
      const file = state.pdfImageFile;
      showProgress("pdfImage", "Opening PDF", 0, 1, file.name);

      try {
        pdf = await loadPdfJsDocument(file, "export pages as images");
      } catch (error) {
        throw addFileContext(error, file);
      }

      const pageIndexes = getPdfImagePageIndexes(settings.pageMode, pdf.numPages);

      if (pageIndexes.length > 1 && !hasZipLib()) {
        showMessage("pdfImage", "The ZIP library did not load. Refresh this page, then try again.", "error");
        return;
      }

      const baseName = sanitizeName(file.name);
      const mime = settings.format === "jpg" ? "image/jpeg" : "image/png";
      const extension = settings.format === "jpg" ? "jpg" : "png";

      if (pageIndexes.length === 1) {
        const pageNumber = pageIndexes[0] + 1;
        showProgress("pdfImage", "Exporting image", 0, 1, `Rendering page ${pageNumber}`);
        const bytes = await renderPdfPageToImage(pdf, pageNumber, settings, mime);
        setDownload("pdfImage", bytes, `${baseName}-page-${pageNumber}.${extension}`, `Download page ${pageNumber} ${extension.toUpperCase()}`, mime);
        return;
      }

      const zip = new window.JSZip();

      for (const [index, pageIndex] of pageIndexes.entries()) {
        const pageNumber = pageIndex + 1;
        showProgress("pdfImage", "Exporting images", index, pageIndexes.length, `Rendering page ${pageNumber}`);
        const bytes = await renderPdfPageToImage(pdf, pageNumber, settings, mime);
        zip.file(`${baseName}-page-${pageNumber}.${extension}`, bytes);
        showProgress("pdfImage", "Exporting images", index + 1, pageIndexes.length, `Rendered page ${pageNumber}`);
      }

      const zipBytes = await zip.generateAsync({
        compression: "DEFLATE",
        type: "uint8array"
      }, (metadata) => {
        showProgress("pdfImage", "Packaging images", metadata.percent, 100, "Compressing images into one download");
      });
      setDownload("pdfImage", zipBytes, `${baseName}-${extension}-pages.zip`, `Download ${extension.toUpperCase()} images as ZIP`, "application/zip");
    } catch (error) {
      showMessage("pdfImage", formatPdfError("Could not export PDF pages.", error), "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }

      clearBusy();
    }
  }

  async function extractPdfImages() {
    if (!hasPdfJs()) {
      showMessage("pdfExtract", "The local PDF preview library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.pdfExtractFile) {
      showMessage("pdfExtract", "Select one PDF file to extract images from.", "error");
      return;
    }

    const clearBusy = setBusy(els.pdfExtractButton, "Extracting...");
    let pdf;

    try {
      const settings = getPdfExtractSettings();
      const file = state.pdfExtractFile;
      showProgress("pdfExtract", "Opening PDF", 0, 1, file.name);

      try {
        pdf = await loadPdfJsDocument(file, "extract embedded images");
      } catch (error) {
        throw addFileContext(error, file);
      }

      const pageIndexes = getPdfExtractPageIndexes(settings.pageMode, pdf.numPages);
      const extractedImages = [];

      for (const [index, pageIndex] of pageIndexes.entries()) {
        const pageNumber = pageIndex + 1;
        showProgress("pdfExtract", "Scanning PDF", index, pageIndexes.length, `Checking page ${pageNumber}`);
        const page = await pdf.getPage(pageNumber);
        const pageImages = await extractImagesFromPdfPage(page, pageNumber, settings);
        extractedImages.push(...pageImages);
        showProgress("pdfExtract", "Scanning PDF", index + 1, pageIndexes.length, `Found ${pageImages.length} image${pageImages.length === 1 ? "" : "s"} on page ${pageNumber}`);

        if (page.cleanup) {
          page.cleanup();
        }
      }

      if (!extractedImages.length) {
        showMessage("pdfExtract", "No extractable raster images were found. This PDF may use vector artwork, text, or images that the browser renderer cannot expose separately.", "warning");
        return;
      }

      const baseName = sanitizeName(file.name);

      if (extractedImages.length === 1) {
        const image = extractedImages[0];
        setDownload(
          "pdfExtract",
          image.bytes,
          getExtractedImageFilename(baseName, image),
          "Download extracted PNG image",
          "image/png"
        );
        return;
      }

      if (!hasZipLib()) {
        showMessage("pdfExtract", "The ZIP library did not load. Refresh this page, then try again.", "error");
        return;
      }

      const zip = new window.JSZip();
      extractedImages.forEach((image) => {
        zip.file(getExtractedImageFilename(baseName, image), image.bytes);
      });

      const zipBytes = await zip.generateAsync({
        compression: "DEFLATE",
        type: "uint8array"
      }, (metadata) => {
        showProgress("pdfExtract", "Packaging images", metadata.percent, 100, "Compressing extracted images into one download");
      });

      setDownload(
        "pdfExtract",
        zipBytes,
        `${baseName}-extracted-images.zip`,
        `Download ${extractedImages.length} extracted images as ZIP`,
        "application/zip"
      );
    } catch (error) {
      showMessage("pdfExtract", formatPdfError("Could not extract images.", error), "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }

      clearBusy();
    }
  }

  async function pdfToText() {
    if (!hasPdfJs()) {
      showMessage("pdfText", "The local PDF preview library did not load. Refresh this page, then try again.", "error");
      return;
    }

    if (!state.pdfTextFile) {
      showMessage("pdfText", "Select one PDF file to extract text from.", "error");
      return;
    }

    const clearBusy = setBusy(els.pdfTextButton, "Extracting...");
    let pdf;

    try {
      const settings = getPdfTextSettings();
      const file = state.pdfTextFile;
      showProgress("pdfText", "Opening PDF", 0, 1, file.name);

      try {
        pdf = await loadPdfJsDocument(file, "extract text");
      } catch (error) {
        throw addFileContext(error, file);
      }

      const pageIndexes = getPdfTextPageIndexes(settings.pageMode, pdf.numPages);
      const chunks = [];

      for (const [index, pageIndex] of pageIndexes.entries()) {
        const pageNumber = pageIndex + 1;
        showProgress("pdfText", "Extracting text", index, pageIndexes.length, `Reading page ${pageNumber}`);
        const page = await pdf.getPage(pageNumber);
        const text = await extractTextFromPdfPage(page);

        if (settings.pageBreaks) {
          chunks.push(`--- Page ${pageNumber} ---\n${text}`);
        } else {
          chunks.push(text);
        }

        if (page.cleanup) {
          page.cleanup();
        }

        showProgress("pdfText", "Extracting text", index + 1, pageIndexes.length, `Extracted page ${pageNumber}`);
      }

      const output = chunks.join(settings.pageBreaks ? "\n\n" : "\n").trim();

      if (!output) {
        showMessage("pdfText", "No selectable text was found. This PDF may be scanned images and would need OCR.", "warning");
        return;
      }

      const bytes = new TextEncoder().encode(`${output}\n`);
      setDownload(
        "pdfText",
        bytes,
        `${sanitizeName(file.name)}-text.txt`,
        "Download TXT file",
        "text/plain"
      );
    } catch (error) {
      showMessage("pdfText", formatPdfError("Could not extract text.", error), "error");
    } finally {
      if (pdf) {
        pdf.destroy();
      }

      clearBusy();
    }
  }

  function getPdfTextSettings() {
    const checkedMode = document.querySelector("input[name='pdfTextPages']:checked");

    return {
      pageBreaks: els.pdfTextPageBreaks.checked,
      pageMode: checkedMode ? checkedMode.value : "all"
    };
  }

  function getPdfTextPageIndexes(mode, pageCount) {
    if (mode === "first") {
      return [0];
    }

    if (mode === "range") {
      return parsePageSelection(els.pdfTextPageSelection.value, pageCount);
    }

    return Array.from({ length: pageCount }, (_, index) => index);
  }

  async function extractTextFromPdfPage(page) {
    const textContent = await page.getTextContent();
    const items = (textContent.items || [])
      .map((item) => ({
        str: String(item.str || "").trim(),
        x: item.transform ? item.transform[4] : 0,
        y: item.transform ? item.transform[5] : 0
      }))
      .filter((item) => item.str);

    if (!items.length) {
      return "";
    }

    items.sort((a, b) => {
      if (Math.abs(b.y - a.y) > 3) {
        return b.y - a.y;
      }

      return a.x - b.x;
    });

    const lines = [];
    items.forEach((item) => {
      const line = lines.find((candidate) => Math.abs(candidate.y - item.y) <= 3);

      if (line) {
        line.items.push(item);
      } else {
        lines.push({
          items: [item],
          y: item.y
        });
      }
    });

    return lines
      .sort((a, b) => b.y - a.y)
      .map((line) => line.items
        .sort((a, b) => a.x - b.x)
        .map((item) => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim())
      .filter(Boolean)
      .join("\n");
  }

  function getPdfImageSettings() {
    const scale = Number(els.pdfImageScale.value);
    const checkedMode = document.querySelector("input[name='pdfImagePages']:checked");

    return {
      format: els.pdfImageFormat.value,
      pageMode: checkedMode ? checkedMode.value : "all",
      scale: Number.isFinite(scale) ? clamp(scale, 1, 2) : 1.5
    };
  }

  function getPdfImagePageIndexes(mode, pageCount) {
    if (mode === "first") {
      return [0];
    }

    if (mode === "range") {
      return parsePageSelection(els.pdfImagePageSelection.value, pageCount);
    }

    return Array.from({ length: pageCount }, (_, index) => index);
  }

  function getPdfExtractSettings() {
    const minWidth = Number(els.pdfExtractMinWidth.value);
    const checkedMode = document.querySelector("input[name='pdfExtractPages']:checked");

    return {
      minWidth: Number.isFinite(minWidth) ? Math.round(clamp(minWidth, 1, 3000)) : 80,
      pageMode: checkedMode ? checkedMode.value : "all"
    };
  }

  function getPdfExtractPageIndexes(mode, pageCount) {
    if (mode === "first") {
      return [0];
    }

    if (mode === "range") {
      return parsePageSelection(els.pdfExtractPageSelection.value, pageCount);
    }

    return Array.from({ length: pageCount }, (_, index) => index);
  }

  async function extractImagesFromPdfPage(page, pageNumber, settings) {
    const ops = window.pdfjsLib.OPS || {};
    const operatorList = await page.getOperatorList();
    const imageObjectOps = new Set([
      ops.paintImageXObject,
      ops.paintJpegXObject,
      ops.paintImageXObjectRepeat
    ].filter((value) => typeof value === "number"));
    const inlineImageOps = new Set([
      ops.paintInlineImageXObject,
      ops.paintInlineImageXObjectGroup
    ].filter((value) => typeof value === "number"));
    const images = [];
    const seenObjects = new Set();

    for (let index = 0; index < operatorList.fnArray.length; index += 1) {
      const fn = operatorList.fnArray[index];
      const args = operatorList.argsArray[index] || [];

      if (imageObjectOps.has(fn)) {
        const imageName = args[0];

        if (imageName === undefined || imageName === null) {
          continue;
        }

        const imageKey = String(imageName);

        if (seenObjects.has(imageKey)) {
          continue;
        }

        seenObjects.add(imageKey);
        const imageObject = await getPdfJsPageObject(page, imageName);
        await addPdfExtractedImage(images, imageObject, pageNumber, settings);
        continue;
      }

      if (inlineImageOps.has(fn)) {
        const inlineImages = collectPdfInlineImages(args[0]);

        for (const imageObject of inlineImages) {
          await addPdfExtractedImage(images, imageObject, pageNumber, settings);
        }
      }
    }

    return images.map((image, index) => ({
      ...image,
      imageNumber: index + 1
    }));
  }

  function getPdfJsPageObject(page, name) {
    return new Promise((resolve) => {
      let settled = false;
      let timeoutId;

      const finish = (value) => {
        if (settled) return;
        settled = true;

        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }

        resolve(value || null);
      };

      timeoutId = window.setTimeout(() => finish(null), 4000);

      try {
        const value = page.objs.get(name, finish);

        if (value) {
          finish(value);
        }
      } catch (error) {
        finish(null);
      }
    });
  }

  function collectPdfInlineImages(value) {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.flatMap(collectPdfInlineImages);
    }

    if (value.images && Array.isArray(value.images)) {
      return value.images.flatMap((image) => collectPdfInlineImages(image.imgData || image.image || image));
    }

    return [value];
  }

  async function addPdfExtractedImage(images, imageObject, pageNumber, settings) {
    const dimensions = getPdfImageObjectDimensions(imageObject);

    if (!dimensions || dimensions.width < settings.minWidth) {
      return;
    }

    const canvas = pdfImageObjectToCanvas(imageObject);

    if (!canvas) {
      return;
    }

    const bytes = await canvasToBytes(canvas, "image/png");
    images.push({
      bytes,
      height: canvas.height,
      pageNumber,
      width: canvas.width
    });
  }

  function getPdfImageObjectDimensions(imageObject) {
    const source = imageObject && (imageObject.bitmap || imageObject);
    const width = source && Number(source.width);
    const height = source && Number(source.height);

    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      return null;
    }

    return {
      height: Math.floor(height),
      width: Math.floor(width)
    };
  }

  function pdfImageObjectToCanvas(imageObject) {
    const dimensions = getPdfImageObjectDimensions(imageObject);

    if (!dimensions) {
      return null;
    }

    const source = imageObject && (imageObject.bitmap || imageObject);
    const canvas = document.createElement("canvas");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext("2d");

    if (source && !source.data) {
      try {
        context.drawImage(source, 0, 0, canvas.width, canvas.height);
        return canvas;
      } catch (error) {
        return null;
      }
    }

    const data = source && source.data;

    if (!data) {
      return null;
    }

    const pixelCount = canvas.width * canvas.height;
    const rgba = createRgbaImageData(data, pixelCount);

    if (!rgba) {
      return null;
    }

    context.putImageData(new ImageData(rgba, canvas.width, canvas.height), 0, 0);
    return canvas;
  }

  function createRgbaImageData(data, pixelCount) {
    const input = data instanceof Uint8ClampedArray ? data : new Uint8ClampedArray(data);

    if (input.length === pixelCount * 4) {
      return new Uint8ClampedArray(input);
    }

    const rgba = new Uint8ClampedArray(pixelCount * 4);

    if (input.length === pixelCount * 3) {
      for (let inputIndex = 0, outputIndex = 0; inputIndex < input.length; inputIndex += 3, outputIndex += 4) {
        rgba[outputIndex] = input[inputIndex];
        rgba[outputIndex + 1] = input[inputIndex + 1];
        rgba[outputIndex + 2] = input[inputIndex + 2];
        rgba[outputIndex + 3] = 255;
      }

      return rgba;
    }

    if (input.length === pixelCount) {
      for (let inputIndex = 0, outputIndex = 0; inputIndex < input.length; inputIndex += 1, outputIndex += 4) {
        const value = input[inputIndex];
        rgba[outputIndex] = value;
        rgba[outputIndex + 1] = value;
        rgba[outputIndex + 2] = value;
        rgba[outputIndex + 3] = 255;
      }

      return rgba;
    }

    return null;
  }

  function getExtractedImageFilename(baseName, image) {
    const imageNumber = String(image.imageNumber).padStart(2, "0");
    return `${baseName}-page-${image.pageNumber}-image-${imageNumber}-${image.width}x${image.height}.png`;
  }

  async function renderPdfPageToImage(pdf, pageNumber, settings, mime) {
    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: settings.scale });
    const maxPixels = 16000000;
    const pixelCount = baseViewport.width * baseViewport.height;
    const scale = pixelCount > maxPixels
      ? settings.scale * Math.sqrt(maxPixels / pixelCount)
      : settings.scale;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport
    }).promise;

    return canvasToBytes(canvas, mime, 0.92);
  }

  function canvasToBytes(canvas, mime, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not create image output."));
          return;
        }

        blob.arrayBuffer()
          .then((buffer) => resolve(new Uint8Array(buffer)))
          .catch(reject);
      }, mime, quality);
    });
  }

  async function imagesToPdf() {
    if (!hasPdfLib()) {
      showMessage("image", "The PDF library did not load. Check your internet connection, then refresh this page.", "error");
      return;
    }

    if (!state.imageFiles.length) {
      showMessage("image", "Select at least one JPEG or PNG image.", "error");
      return;
    }

    const clearBusy = setBusy(els.imageButton, "Converting...");

    try {
      const { PDFDocument } = window.PDFLib;
      const outputPdf = await PDFDocument.create();
      const settings = getImagePdfSettings();

      for (const [index, file] of state.imageFiles.entries()) {
        showProgress("image", "Converting images", index, state.imageFiles.length, `Adding ${file.name}`);
        const bytes = await file.arrayBuffer();
        const image = await embedImage(outputPdf, file, bytes);
        const placement = getImagePlacement(image, settings);
        const page = outputPdf.addPage([placement.pageWidth, placement.pageHeight]);
        page.drawImage(image, placement.draw);
        showProgress("image", "Converting images", index + 1, state.imageFiles.length, `Added ${file.name}`);
      }

      showProgress("image", "Converting images", state.imageFiles.length, state.imageFiles.length, "Preparing download");
      const pdfBytes = await outputPdf.save();
      setDownload("image", pdfBytes, "images.pdf", "Download image PDF");
    } catch (error) {
      showMessage("image", `Could not convert these images. ${error.message}`, "error");
    } finally {
      clearBusy();
    }
  }

  async function embedImage(pdfDoc, file, bytes) {
    const mime = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (mime === "image/png" || name.endsWith(".png")) {
      return pdfDoc.embedPng(bytes);
    }

    if (mime === "image/jpeg" || name.endsWith(".jpg") || name.endsWith(".jpeg")) {
      return pdfDoc.embedJpg(bytes);
    }

    throw new Error(`${file.name} is not a supported JPEG or PNG image.`);
  }

  function getImagePdfSettings() {
    const margin = Number(els.imageMargin.value);

    return {
      fitMode: els.imageFitMode.value,
      margin: Number.isFinite(margin) ? clamp(margin, 0, 144) : 24,
      orientation: els.imageOrientation.value,
      pageSize: els.imagePageSize.value
    };
  }

  function getImagePlacement(image, settings) {
    let dimensions = getImagePageDimensions(image, settings);
    dimensions = applyOrientation(dimensions, settings.orientation);

    const [pageWidth, pageHeight] = dimensions;
    const safeMargin = Math.min(settings.margin, Math.max(0, (Math.min(pageWidth, pageHeight) - 24) / 2));
    const contentWidth = pageWidth - safeMargin * 2;
    const contentHeight = pageHeight - safeMargin * 2;

    if (contentWidth <= 0 || contentHeight <= 0) {
      throw new Error("Margins are too large for the selected page size.");
    }

    const scale = settings.fitMode === "fill"
      ? Math.max(contentWidth / image.width, contentHeight / image.height)
      : Math.min(contentWidth / image.width, contentHeight / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;

    return {
      draw: {
        height: drawHeight,
        width: drawWidth,
        x: (pageWidth - drawWidth) / 2,
        y: (pageHeight - drawHeight) / 2
      },
      pageHeight,
      pageWidth
    };
  }

  function getImagePageDimensions(image, settings) {
    if (settings.pageSize === "auto") {
      return [
        image.width + settings.margin * 2,
        image.height + settings.margin * 2
      ];
    }

    return pageSizes[settings.pageSize].slice();
  }

  function applyOrientation(dimensions, orientation) {
    const [width, height] = dimensions;

    if (orientation === "portrait" && width > height) {
      return [height, width];
    }

    if (orientation === "landscape" && height > width) {
      return [height, width];
    }

    return dimensions;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function initAnnotationPad() {
    const context = getAnnotationContext();

    if (!context) return;

    applyAnnotationStrokeStyle(context);
    updateAnnotationMode();
    els.annotationCanvas.addEventListener("pointerdown", beginAnnotationStroke);
    els.annotationCanvas.addEventListener("pointermove", continueAnnotationStroke);
    els.annotationCanvas.addEventListener("pointerup", endAnnotationStroke);
    els.annotationCanvas.addEventListener("pointercancel", endAnnotationStroke);
    els.annotationCanvas.addEventListener("pointerleave", endAnnotationStroke);
  }

  function getAnnotationContext() {
    return els.annotationCanvas ? els.annotationCanvas.getContext("2d") : null;
  }

  function applyAnnotationStrokeStyle(context) {
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 4;
    context.strokeStyle = els.annotateColor.value || "#f59e0b";
  }

  function beginAnnotationStroke(event) {
    if (event.button !== undefined && event.button > 0) return;

    const context = getAnnotationContext();
    if (!context) return;

    const point = getAnnotationPoint(event);
    event.preventDefault();
    revokeToolUrls("annotate");
    els.annotateResult.innerHTML = "";
    state.annotationDrawing = true;
    state.annotationHasInk = true;
    applyAnnotationStrokeStyle(context);
    context.beginPath();
    context.moveTo(point.x, point.y);

    if (els.annotationCanvas.setPointerCapture) {
      els.annotationCanvas.setPointerCapture(event.pointerId);
    }
  }

  function continueAnnotationStroke(event) {
    if (!state.annotationDrawing) return;

    const context = getAnnotationContext();
    if (!context) return;

    const point = getAnnotationPoint(event);
    event.preventDefault();
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function endAnnotationStroke(event) {
    if (!state.annotationDrawing) return;

    state.annotationDrawing = false;

    if (els.annotationCanvas.releasePointerCapture) {
      try {
        els.annotationCanvas.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture may already be released by the browser.
      }
    }
  }

  function getAnnotationPoint(event) {
    const rect = els.annotationCanvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * els.annotationCanvas.width,
      y: ((event.clientY - rect.top) / rect.height) * els.annotationCanvas.height
    };
  }

  function clearAnnotationPad() {
    const context = getAnnotationContext();

    if (context) {
      context.clearRect(0, 0, els.annotationCanvas.width, els.annotationCanvas.height);
    }

    state.annotationDrawing = false;
    state.annotationHasInk = false;
    revokeToolUrls("annotate");

    if (els.annotateResult) {
      els.annotateResult.innerHTML = "";
    }
  }

  function updateAnnotationMode() {
    if (!els.annotationDrawPanel) return;

    els.annotationDrawPanel.hidden = els.annotateType.value !== "draw";
  }

  function initSignaturePad() {
    const context = getSignatureContext();

    if (!context) return;

    applySignatureStrokeStyle(context, getSignatureSettings());
    updateSignatureMode();

    els.signatureCanvas.addEventListener("pointerdown", beginSignatureStroke);
    els.signatureCanvas.addEventListener("pointermove", continueSignatureStroke);
    els.signatureCanvas.addEventListener("pointerup", endSignatureStroke);
    els.signatureCanvas.addEventListener("pointercancel", endSignatureStroke);
    els.signatureCanvas.addEventListener("pointerleave", endSignatureStroke);
  }

  function getSignatureContext() {
    return els.signatureCanvas ? els.signatureCanvas.getContext("2d") : null;
  }

  function beginSignatureStroke(event) {
    if (event.button !== undefined && event.button > 0) return;

    const context = getSignatureContext();
    if (!context) return;

    const point = getSignaturePoint(event);
    event.preventDefault();
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
    state.signatureDrawing = true;
    state.signatureHasInk = true;
    applySignatureStrokeStyle(context, getSignatureSettings());
    context.beginPath();
    context.moveTo(point.x, point.y);

    if (els.signatureCanvas.setPointerCapture) {
      els.signatureCanvas.setPointerCapture(event.pointerId);
    }

    if (isSignatureFullOpen()) {
      syncSignatureFullMode();
    }

    updateSignaturePlacementPreview();
  }

  function continueSignatureStroke(event) {
    if (!state.signatureDrawing) return;

    const context = getSignatureContext();
    if (!context) return;

    const point = getSignaturePoint(event);
    event.preventDefault();
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function endSignatureStroke(event) {
    if (!state.signatureDrawing) return;

    state.signatureDrawing = false;

    if (els.signatureCanvas.releasePointerCapture) {
      try {
        els.signatureCanvas.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Pointer capture may already be released by the browser.
      }
    }

    updateSignaturePlacementPreview();
  }

  function getSignaturePoint(event) {
    const rect = els.signatureCanvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * els.signatureCanvas.width,
      y: ((event.clientY - rect.top) / rect.height) * els.signatureCanvas.height
    };
  }

  function clearSignaturePad() {
    const context = getSignatureContext();

    if (context) {
      context.clearRect(0, 0, els.signatureCanvas.width, els.signatureCanvas.height);
    }

    state.signatureDrawing = false;
    state.signatureHasInk = false;
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";

    if (isSignatureFullOpen()) {
      syncSignatureFullMode();
    }

    updateSignaturePlacementPreview();
  }

  function updateSignatureMode() {
    const isTypeMode = els.signatureMode.value === "type";
    els.signaturePanel.classList.toggle("is-type-mode", isTypeMode);
    els.signaturePanel.classList.toggle("is-draw-mode", !isTypeMode);
  }

  function updateSignaturePositionControls() {
    const isCustom = els.signaturePosition.value === "custom";

    document.querySelectorAll(".signature-custom-row").forEach((row) => {
      row.hidden = !isCustom;
    });
  }

  function initTheme() {
    const savedTheme = getSavedTheme();
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark, false);
  }

  function getSavedTheme() {
    try {
      return window.localStorage.getItem("pdf-tool-theme");
    } catch (error) {
      return null;
    }
  }

  function setDarkMode(enabled, persist) {
    const language = getLanguage();
    document.body.classList.toggle("dark-mode", enabled);
    els.themeToggle.setAttribute("aria-pressed", String(enabled));

    const themeIcon = els.themeToggle.querySelector(".theme-toggle-icon");
    const themeText = els.themeToggle.querySelector(".theme-toggle-text");

    if (themeIcon && themeText) {
      themeIcon.textContent = enabled ? "☀" : "☾";
      themeText.textContent = enabled ? language.common.light : language.common.dark;
    } else {
      els.themeToggle.textContent = enabled ? language.common.light : language.common.dark;
    }

    const themeMeta = document.querySelector("meta[name='theme-color']");

    if (themeMeta) {
      themeMeta.setAttribute("content", enabled ? "#121614" : "#0f766e");
    }

    els.themeToggle.setAttribute("aria-label", enabled ? language.common.switchToLight : language.common.switchToDark);
    els.themeToggle.title = enabled ? language.common.switchToLight : language.common.switchToDark;

    if (persist) {
      try {
        window.localStorage.setItem("pdf-tool-theme", enabled ? "dark" : "light");
      } catch (error) {
        // Local storage can be unavailable for file URLs in some browser settings.
      }
    }
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    const canRegister = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!canRegister) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // The app still works normally if install/offline caching is unavailable.
      });
    });
  }

  function initInstallPrompt() {
    if (!els.installButton) return;

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.deferredInstallPrompt = event;
      els.installButton.hidden = false;
    });

    window.addEventListener("appinstalled", () => {
      state.deferredInstallPrompt = null;
      els.installButton.hidden = true;
    });
  }

  async function promptInstallApp() {
    if (!state.deferredInstallPrompt) return;

    const promptEvent = state.deferredInstallPrompt;
    state.deferredInstallPrompt = null;
    els.installButton.hidden = true;
    promptEvent.prompt();

    try {
      await promptEvent.userChoice;
    } catch (error) {
      // Some browsers do not expose the final install choice.
    }
  }

  els.toolSearch.addEventListener("input", () => {
    applyToolFilter(els.toolSearch.value, getActiveToolCategory());
  });

  els.toolCategoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".tool-category-button");

    if (!button) return;

    setActiveToolCategory(button.dataset.toolCategory || "all");
    applyToolFilter(els.toolSearch.value, getActiveToolCategory());
  });

  if (els.quickAllTools) {
    els.quickAllTools.addEventListener("click", () => {
      els.toolNavToggle.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      window.setTimeout(() => {
        setToolsPanelOpen(true, true);
      }, 160);
    });
  }

  document.querySelectorAll(".quick-tool-card[data-tool-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openToolFromHome(button.dataset.toolId);
    });
  });

  if (els.homeUploadFiles) {
    els.homeUploadFiles.addEventListener("change", async () => {
      await handleHomeUploadFiles(readSelectedFiles(els.homeUploadFiles));
      els.homeUploadFiles.value = "";
    });
  }

  if (els.homeUploadZone) {
    let homeDragDepth = 0;

    els.homeUploadZone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      homeDragDepth += 1;
      els.homeUploadZone.classList.add("is-dragging");
    });

    els.homeUploadZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      els.homeUploadZone.classList.add("is-dragging");
    });

    els.homeUploadZone.addEventListener("dragleave", () => {
      homeDragDepth -= 1;

      if (homeDragDepth <= 0) {
        homeDragDepth = 0;
        els.homeUploadZone.classList.remove("is-dragging");
      }
    });

    els.homeUploadZone.addEventListener("drop", async (event) => {
      event.preventDefault();
      homeDragDepth = 0;
      els.homeUploadZone.classList.remove("is-dragging");
      await handleHomeUploadFiles(event.dataTransfer.files);
    });
  }

  els.toolNavToggle.addEventListener("click", toggleToolsPanel);
  els.toolNavClose.addEventListener("click", () => {
    setToolsPanelOpen(false, false);
    els.toolNavToggle.focus();
  });

  els.toolNavBackdrop.addEventListener("click", () => {
    setToolsPanelOpen(false, false);
    els.toolNavToggle.focus();
  });

  els.languageSelect.addEventListener("change", () => {
    setLanguage(els.languageSelect.value, true);
  });

  els.downloadHistoryPanel.addEventListener("toggle", () => {
    if (els.downloadHistoryPanel.open) {
      setToolsPanelOpen(false, false);
      setSettingsPanelOpen(false);
    }
  });

  els.settingsPanel.addEventListener("toggle", () => {
    if (els.settingsPanel.open) {
      setToolsPanelOpen(false, false);
      setHistoryPanelOpen(false);
    }
  });

  document.querySelectorAll(".tools-nav-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = button.getAttribute("href").slice(1);
      setActiveTool(targetId, {
        focus: true,
        remember: true
      });
      setToolsPanelOpen(false, false);

      if (window.location.hash !== `#${targetId}`) {
        window.location.hash = targetId;
      }
    });
  });

  els.recentToolsList.addEventListener("click", (event) => {
    const button = event.target.closest(".recent-tool-button");

    if (!button) return;

    const targetId = button.dataset.toolId;
    setActiveTool(targetId, {
      focus: true,
      remember: true
    });

    if (window.location.hash !== `#${targetId}`) {
      window.location.hash = targetId;
    }
  });

  els.toolsMenuRecentList.addEventListener("click", (event) => {
    const button = event.target.closest(".recent-tool-button");

    if (!button) return;

    const targetId = button.dataset.toolId;
    setActiveTool(targetId, {
      focus: true,
      remember: true
    });
    setToolsPanelOpen(false, false);

    if (window.location.hash !== `#${targetId}`) {
      window.location.hash = targetId;
    }
  });

  document.addEventListener("click", (event) => {
    if (!els.toolNavPanel.hidden && !event.target.closest(".header-tools")) {
      setToolsPanelOpen(false, false);
    }

    if (els.downloadHistoryPanel.open && !event.target.closest(".header-history")) {
      setHistoryPanelOpen(false);
    }

    if (els.settingsPanel.open && !event.target.closest(".header-settings")) {
      setSettingsPanelOpen(false);
    }
  });

  window.addEventListener("hashchange", updateCurrentToolFromHash);

  els.mergeFiles.addEventListener("change", () => {
    setMergeFiles(readSelectedFiles(els.mergeFiles).filter(isPdfFile));
  });

  els.imageFiles.addEventListener("change", () => {
    state.imageFiles = readSelectedFiles(els.imageFiles).filter(isImageFile);
    refreshList("image");
    els.imageResult.innerHTML = "";
    showFileSizeWarning("image", state.imageFiles, "image");
  });

  els.spreadsheetFiles.addEventListener("change", () => {
    state.spreadsheetFiles = readSelectedFiles(els.spreadsheetFiles).filter(isSpreadsheetFile);
    refreshList("spreadsheet");
    els.spreadsheetResult.innerHTML = "";
    showFileSizeWarning("spreadsheet", state.spreadsheetFiles, "document");
  });

  els.wordFiles.addEventListener("change", () => {
    state.wordFiles = readSelectedFiles(els.wordFiles).filter(isDocxFile);
    refreshList("word");
    els.wordResult.innerHTML = "";
    showFileSizeWarning("word", state.wordFiles, "document");
  });

  els.textFiles.addEventListener("change", () => {
    state.textFiles = readSelectedFiles(els.textFiles).filter(isTextFile);
    refreshList("text");
    els.textResult.innerHTML = "";
    showFileSizeWarning("text", state.textFiles, "text");
  });

  els.pdfImageFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.pdfImageFile).find(isPdfFile) || null;
    setPdfImageFile(selectedFile);
  });

  els.pdfExtractFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.pdfExtractFile).find(isPdfFile) || null;
    setPdfExtractFile(selectedFile);
  });

  [els.imagePageSize, els.imageOrientation, els.imageMargin, els.imageFitMode].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("image");
      els.imageResult.innerHTML = "";
    });
  });

  [
    els.spreadsheetPageSize,
    els.spreadsheetOrientation,
    els.spreadsheetMargin,
    els.spreadsheetFitWidth,
    els.spreadsheetGridlines
  ].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("spreadsheet");
      els.spreadsheetResult.innerHTML = "";
    });
  });

  [els.wordPageSize, els.wordOrientation, els.wordMargin, els.wordFontSize].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("word");
      els.wordResult.innerHTML = "";
    });
  });

  [els.textPageSize, els.textOrientation, els.textMargin, els.textFontSize].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("text");
      els.textResult.innerHTML = "";
    });
  });

  [els.pdfImageFormat, els.pdfImageScale, els.pdfImagePageSelection].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("pdfImage");
      els.pdfImageResult.innerHTML = "";
    });
  });

  [els.pdfExtractPageSelection, els.pdfExtractMinWidth].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("pdfExtract");
      els.pdfExtractResult.innerHTML = "";
    });
  });

  [
    els.annotatePage,
    els.annotateText,
    els.annotateColor,
    els.annotateOpacity,
    els.annotateFontSize,
    els.annotateX,
    els.annotateY,
    els.annotateWidth,
    els.annotateHeight
  ].forEach((control) => {
    const eventName = control === els.annotateText || control === els.annotateColor ? "input" : "change";
    control.addEventListener(eventName, () => {
      if (control === els.annotateColor) {
        const context = getAnnotationContext();

        if (context) {
          applyAnnotationStrokeStyle(context);
        }
      }

      revokeToolUrls("annotate");
      els.annotateResult.innerHTML = "";
    });
  });

  els.annotateType.addEventListener("change", () => {
    updateAnnotationMode();
    revokeToolUrls("annotate");
    els.annotateResult.innerHTML = "";
  });

  els.flattenScale.addEventListener("change", () => {
    revokeToolUrls("flatten");
    els.flattenResult.innerHTML = "";
  });

  [els.cropPageSelection, els.cropTop, els.cropRight, els.cropBottom, els.cropLeft].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("crop");
      els.cropResult.innerHTML = "";
    });
  });

  [
    els.addTextValue,
    els.addTextPage,
    els.addTextFontSize,
    els.addTextColor,
    els.addTextX,
    els.addTextY,
    els.addTextWidth
  ].forEach((control) => {
    const eventName = control === els.addTextValue || control === els.addTextColor ? "input" : "change";
    control.addEventListener(eventName, () => {
      revokeToolUrls("addText");
      els.addTextResult.innerHTML = "";
    });
  });

  els.removePasswordScale.addEventListener("change", () => {
    revokeToolUrls("removePassword");
    els.removePasswordResult.innerHTML = "";
  });

  [els.pdfTextPageSelection, els.pdfTextPageBreaks].forEach((control) => {
    control.addEventListener("change", () => {
      revokeToolUrls("pdfText");
      els.pdfTextResult.innerHTML = "";
    });
  });

  document.querySelectorAll("input[name='pdfImagePages']").forEach((input) => {
    input.addEventListener("change", () => {
      const rangeMode = input.value === "range" && input.checked;
      els.pdfImagePageSelection.disabled = !rangeMode;
      revokeToolUrls("pdfImage");
      els.pdfImageResult.innerHTML = "";

      if (rangeMode) {
        els.pdfImagePageSelection.focus();
      }
    });
  });

  document.querySelectorAll("input[name='pdfExtractPages']").forEach((input) => {
    input.addEventListener("change", () => {
      const rangeMode = input.value === "range" && input.checked;
      els.pdfExtractPageSelection.disabled = !rangeMode;
      revokeToolUrls("pdfExtract");
      els.pdfExtractResult.innerHTML = "";

      if (rangeMode) {
        els.pdfExtractPageSelection.focus();
      }
    });
  });

  document.querySelectorAll("input[name='pdfTextPages']").forEach((input) => {
    input.addEventListener("change", () => {
      const rangeMode = input.value === "range" && input.checked;
      els.pdfTextPageSelection.disabled = !rangeMode;
      revokeToolUrls("pdfText");
      els.pdfTextResult.innerHTML = "";

      if (rangeMode) {
        els.pdfTextPageSelection.focus();
      }
    });
  });

  document.querySelectorAll("input[name='cropPages']").forEach((input) => {
    input.addEventListener("change", () => {
      const rangeMode = input.value === "range" && input.checked;
      els.cropPageSelection.disabled = !rangeMode;
      revokeToolUrls("crop");
      els.cropResult.innerHTML = "";

      if (rangeMode) {
        els.cropPageSelection.focus();
      }
    });
  });

  document.querySelectorAll("input[name='splitMode']").forEach((input) => {
    input.addEventListener("change", () => {
      const rangeMode = input.value === "range" && input.checked;
      els.pageSelection.disabled = !rangeMode;

      if (rangeMode) {
        els.pageSelection.focus();
      }
    });
  });

  els.splitFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.splitFile).find(isPdfFile) || null;
    setSplitFile(selectedFile);
  });

  els.compressFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.compressFile).find(isPdfFile) || null;
    setCompressFile(selectedFile);
  });

  els.watermarkFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.watermarkFile).find(isPdfFile) || null;
    setWatermarkFile(selectedFile);
  });

  els.pageNumberFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.pageNumberFile).find(isPdfFile) || null;
    setPageNumberFile(selectedFile);
  });

  els.signatureFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.signatureFile).find(isPdfFile) || null;
    setSignatureFile(selectedFile);
  });

  els.metadataFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.metadataFile).find(isPdfFile) || null;
    setMetadataFile(selectedFile);
  });

  els.annotateFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.annotateFile).find(isPdfFile) || null;
    setAnnotateFile(selectedFile);
  });

  els.flattenFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.flattenFile).find(isPdfFile) || null;
    setFlattenFile(selectedFile);
  });

  els.cropFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.cropFile).find(isPdfFile) || null;
    setCropFile(selectedFile);
  });

  els.addTextFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.addTextFile).find(isPdfFile) || null;
    setAddTextFile(selectedFile);
  });

  els.removePasswordFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.removePasswordFile).find(isPdfFile) || null;
    setRemovePasswordFile(selectedFile);
  });

  els.pdfTextFile.addEventListener("change", () => {
    const selectedFile = readSelectedFiles(els.pdfTextFile).find(isPdfFile) || null;
    setPdfTextFile(selectedFile);
  });

  [els.watermarkText, els.watermarkPosition, els.watermarkFontSize, els.watermarkOpacity].forEach((control) => {
    const eventName = control === els.watermarkText ? "input" : "change";

    control.addEventListener(eventName, () => {
      revokeToolUrls("watermark");
      els.watermarkResult.innerHTML = "";
    });
  });

  [els.pageNumberPosition, els.pageNumberFormat, els.pageNumberStart, els.pageNumberFontSize].forEach((control) => {
    const eventName = control === els.pageNumberStart || control === els.pageNumberFontSize ? "input" : "change";

    control.addEventListener(eventName, () => {
      revokeToolUrls("pageNumbers");
      els.pageNumberResult.innerHTML = "";
    });
  });

  els.signatureMode.addEventListener("change", () => {
    updateSignatureMode();
    state.signatureFullTool = getDefaultSignatureFullTool();
    syncSignatureFullMode();
    revokeToolUrls("signature");
    els.signatureResult.innerHTML = "";
  });

  [els.signaturePage, els.signaturePosition, els.signatureWidth, els.signatureColor, els.signatureStrokeWidth, els.signatureX, els.signatureY, els.signatureText].forEach((control) => {
    const eventName = control === els.signaturePosition || control === els.signatureColor ? "change" : "input";

    control.addEventListener(eventName, () => {
      if (control === els.signaturePosition) {
        updateSignaturePositionControls();
      }

      if (control === els.signaturePage) {
        clearSignatureFullDrawing(true);

        if (isSignatureFullOpen()) {
          renderSignatureFullPreview({ resetDrawing: true });
        }
      } else {
        updateSignaturePlacementPreview();
      }

      revokeToolUrls("signature");
      els.signatureResult.innerHTML = "";
    });
  });

  [els.metadataTitle, els.metadataAuthor, els.metadataSubject, els.metadataKeywords].forEach((control) => {
    control.addEventListener("input", () => {
      revokeToolUrls("metadata");
      els.metadataResult.innerHTML = "";
    });
  });

  setupDropZone(els.mergeFiles, {
    accepts: isPdfFile,
    emptyMessage: "Drop PDF files into this merge panel.",
    multiple: true,
    tool: "merge",
    onFiles(files, rejectedCount) {
      setMergeFiles(files);

      if (rejectedCount > 0) {
        showMessage("merge", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.splitFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this split panel.",
    multiple: false,
    tool: "split",
    onFiles(files, rejectedCount) {
      setSplitFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("split", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.compressFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this compression panel.",
    multiple: false,
    tool: "compress",
    onFiles(files, rejectedCount) {
      setCompressFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("compress", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.watermarkFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this watermark panel.",
    multiple: false,
    tool: "watermark",
    onFiles(files, rejectedCount) {
      setWatermarkFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("watermark", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.pageNumberFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this page number panel.",
    multiple: false,
    tool: "pageNumbers",
    onFiles(files, rejectedCount) {
      setPageNumberFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("pageNumbers", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.signatureFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this signing panel.",
    multiple: false,
    tool: "signature",
    onFiles(files, rejectedCount) {
      setSignatureFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("signature", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.metadataFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this metadata panel.",
    multiple: false,
    tool: "metadata",
    onFiles(files, rejectedCount) {
      setMetadataFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("metadata", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.annotateFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this annotation panel.",
    multiple: false,
    tool: "annotate",
    onFiles(files, rejectedCount) {
      setAnnotateFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("annotate", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.flattenFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this flatten panel.",
    multiple: false,
    tool: "flatten",
    onFiles(files, rejectedCount) {
      setFlattenFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("flatten", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.cropFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this crop panel.",
    multiple: false,
    tool: "crop",
    onFiles(files, rejectedCount) {
      setCropFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("crop", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.addTextFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this add text panel.",
    multiple: false,
    tool: "addText",
    onFiles(files, rejectedCount) {
      setAddTextFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("addText", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.removePasswordFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this password removal panel.",
    multiple: false,
    tool: "removePassword",
    onFiles(files, rejectedCount) {
      setRemovePasswordFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("removePassword", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.imageFiles, {
    accepts: isImageFile,
    emptyMessage: "Drop JPEG or PNG images into this conversion panel.",
    multiple: true,
    tool: "image",
    onFiles(files, rejectedCount) {
      state.imageFiles = files;
      refreshList("image");
      els.imageResult.innerHTML = "";

      if (rejectedCount > 0) {
        showMessage("image", `${rejectedCount} unsupported file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      } else {
        showFileSizeWarning("image", files, "image");
      }
    }
  });

  setupDropZone(els.spreadsheetFiles, {
    accepts: isSpreadsheetFile,
    emptyMessage: "Drop XLSX or CSV files into this spreadsheet panel.",
    multiple: true,
    tool: "spreadsheet",
    onFiles(files, rejectedCount) {
      state.spreadsheetFiles = files;
      refreshList("spreadsheet");
      els.spreadsheetResult.innerHTML = "";

      if (rejectedCount > 0) {
        showMessage("spreadsheet", `${rejectedCount} unsupported file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      } else {
        showFileSizeWarning("spreadsheet", files, "document");
      }
    }
  });

  setupDropZone(els.wordFiles, {
    accepts: isDocxFile,
    emptyMessage: "Drop DOCX files into this Word panel.",
    multiple: true,
    tool: "word",
    onFiles(files, rejectedCount) {
      state.wordFiles = files;
      refreshList("word");
      els.wordResult.innerHTML = "";

      if (rejectedCount > 0) {
        showMessage("word", `${rejectedCount} unsupported file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      } else {
        showFileSizeWarning("word", files, "document");
      }
    }
  });

  setupDropZone(els.textFiles, {
    accepts: isTextFile,
    emptyMessage: "Drop TXT files into this text panel.",
    multiple: true,
    tool: "text",
    onFiles(files, rejectedCount) {
      state.textFiles = files;
      refreshList("text");
      els.textResult.innerHTML = "";

      if (rejectedCount > 0) {
        showMessage("text", `${rejectedCount} unsupported file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      } else {
        showFileSizeWarning("text", files, "text");
      }
    }
  });

  setupDropZone(els.pdfImageFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this image export panel.",
    multiple: false,
    tool: "pdfImage",
    onFiles(files, rejectedCount) {
      setPdfImageFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("pdfImage", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.pdfExtractFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this image extraction panel.",
    multiple: false,
    tool: "pdfExtract",
    onFiles(files, rejectedCount) {
      setPdfExtractFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("pdfExtract", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  setupDropZone(els.pdfTextFile, {
    accepts: isPdfFile,
    emptyMessage: "Drop one PDF file into this text extraction panel.",
    multiple: false,
    tool: "pdfText",
    onFiles(files, rejectedCount) {
      setPdfTextFile(files[0]);

      if (rejectedCount > 0) {
        showMessage("pdfText", `${rejectedCount} non-PDF file${rejectedCount === 1 ? "" : "s"} ignored.`, "error");
      }
    }
  });

  els.mergeButton.addEventListener("click", mergePdfs);
  els.splitButton.addEventListener("click", splitPdf);
  els.compressButton.addEventListener("click", compressPdf);
  els.watermarkButton.addEventListener("click", watermarkPdf);
  els.pageNumberButton.addEventListener("click", pageNumbersPdf);
  els.signatureButton.addEventListener("click", () => signPdf());
  els.signatureFullButton.addEventListener("click", openSignatureFullView);
  els.signatureFullClose.addEventListener("click", closeSignatureFullView);
  els.signatureFullPrev.addEventListener("click", () => setSignatureFullPage(-1));
  els.signatureFullNext.addEventListener("click", () => setSignatureFullPage(1));
  els.signatureFullClear.addEventListener("click", () => clearSignatureFullDrawing(false));
  els.signatureFullToolDraw.addEventListener("click", () => setSignatureFullTool("draw"));
  els.signatureFullToolPlace.addEventListener("click", () => setSignatureFullTool("place"));
  els.signatureFullSign.addEventListener("click", async () => {
    const success = await signPdf(els.signatureFullSign);

    if (success) {
      closeSignatureFullView();
    }
  });
  els.signatureFullDrawCanvas.addEventListener("pointerdown", beginSignatureFullStroke);
  els.signatureFullDrawCanvas.addEventListener("pointermove", continueSignatureFullStroke);
  els.signatureFullDrawCanvas.addEventListener("pointerup", endSignatureFullStroke);
  els.signatureFullDrawCanvas.addEventListener("pointercancel", endSignatureFullStroke);
  els.signatureFullDrawCanvas.addEventListener("pointerleave", endSignatureFullStroke);
  els.signaturePlacementPreview.addEventListener("pointerdown", beginSignaturePlacementDrag);
  els.signaturePlacementPreview.addEventListener("pointermove", continueSignaturePlacementDrag);
  els.signaturePlacementPreview.addEventListener("pointerup", endSignaturePlacementDrag);
  els.signaturePlacementPreview.addEventListener("pointercancel", endSignaturePlacementDrag);
  els.signatureFullStage.addEventListener("pointerdown", placeSignaturePreviewAtPoint);
  els.metadataButton.addEventListener("click", editPdfMetadata);
  els.annotateButton.addEventListener("click", annotatePdf);
  els.flattenButton.addEventListener("click", flattenPdf);
  els.cropButton.addEventListener("click", cropPdf);
  els.addTextButton.addEventListener("click", addTextToPdf);
  els.removePasswordButton.addEventListener("click", removePdfPassword);
  els.imageButton.addEventListener("click", imagesToPdf);
  els.spreadsheetButton.addEventListener("click", spreadsheetsToPdf);
  els.wordButton.addEventListener("click", wordToPdf);
  els.textButton.addEventListener("click", textToPdf);
  els.pdfImageButton.addEventListener("click", pdfToImages);
  els.pdfExtractButton.addEventListener("click", extractPdfImages);
  els.pdfTextButton.addEventListener("click", pdfToText);
  els.mergeClear.addEventListener("click", () => clearTool("merge"));
  els.splitClear.addEventListener("click", () => clearTool("split"));
  els.compressClear.addEventListener("click", () => clearTool("compress"));
  els.watermarkClear.addEventListener("click", () => clearTool("watermark"));
  els.pageNumberClear.addEventListener("click", () => clearTool("pageNumbers"));
  els.signatureClear.addEventListener("click", () => clearTool("signature"));
  els.signaturePadClear.addEventListener("click", clearSignaturePad);
  els.metadataClear.addEventListener("click", () => clearTool("metadata"));
  els.annotateClear.addEventListener("click", () => clearTool("annotate"));
  els.annotationPadClear.addEventListener("click", clearAnnotationPad);
  els.flattenClear.addEventListener("click", () => clearTool("flatten"));
  els.cropClear.addEventListener("click", () => clearTool("crop"));
  els.addTextClear.addEventListener("click", () => clearTool("addText"));
  els.removePasswordClear.addEventListener("click", () => clearTool("removePassword"));
  els.imageClear.addEventListener("click", () => clearTool("image"));
  els.spreadsheetClear.addEventListener("click", () => clearTool("spreadsheet"));
  els.wordClear.addEventListener("click", () => clearTool("word"));
  els.textClear.addEventListener("click", () => clearTool("text"));
  els.pdfImageClear.addEventListener("click", () => clearTool("pdfImage"));
  els.pdfExtractClear.addEventListener("click", () => clearTool("pdfExtract"));
  els.pdfTextClear.addEventListener("click", () => clearTool("pdfText"));
  els.mergeRotateLeft.addEventListener("click", () => rotateAllPages("merge", -90));
  els.mergeRotateRight.addEventListener("click", () => rotateAllPages("merge", 90));
  els.mergeResetPages.addEventListener("click", () => resetPagePlan("merge"));
  els.splitRotateLeft.addEventListener("click", () => rotateAllPages("split", -90));
  els.splitRotateRight.addEventListener("click", () => rotateAllPages("split", 90));
  els.splitResetPages.addEventListener("click", () => resetPagePlan("split"));
  els.themeToggle.addEventListener("click", () => {
    setDarkMode(!document.body.classList.contains("dark-mode"), true);
  });
  els.installButton.addEventListener("click", promptInstallApp);
  els.downloadHistoryClear.addEventListener("click", clearDownloadHistory);
  els.pdfPasswordForm.addEventListener("submit", submitPdfPassword);
  els.pdfPasswordCancel.addEventListener("click", cancelPdfPasswordRequest);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.pdfPasswordDialog.hidden) {
      cancelPdfPasswordRequest();
      return;
    }

    if (event.key === "Escape" && !els.toolNavPanel.hidden) {
      setToolsPanelOpen(false, false);
      els.toolNavToggle.focus();
      return;
    }

    if (event.key === "Escape" && els.downloadHistoryPanel.open) {
      setHistoryPanelOpen(false);
      els.downloadHistoryPanel.querySelector("summary").focus();
      return;
    }

    if (event.key === "Escape" && els.settingsPanel.open) {
      setSettingsPanelOpen(false);
      els.settingsPanel.querySelector("summary").focus();
      return;
    }

    if (event.key === "Escape" && isSignatureFullOpen()) {
      closeSignatureFullView();
    }
  });

  window.addEventListener("beforeunload", () => {
    const urls = new Set();

    Object.values(state.outputUrls).forEach((toolUrls) => {
      toolUrls.forEach((url) => urls.add(url));
    });
    state.downloadHistory.forEach((item) => urls.add(item.url));
    urls.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  });

  refreshList("merge");
  refreshList("image");
  refreshList("spreadsheet");
  refreshList("word");
  refreshList("text");
  refreshList("split");
  refreshList("compress");
  refreshList("watermark");
  refreshList("pageNumbers");
  refreshList("signature");
  refreshList("metadata");
  refreshList("annotate");
  refreshList("flatten");
  refreshList("crop");
  refreshList("addText");
  refreshList("removePassword");
  refreshList("pdfImage");
  refreshList("pdfExtract");
  refreshList("pdfText");
  initLanguage();
  initRecentTools();
  renderDownloadHistory();
  setToolsPanelOpen(false, false);
  initToolSearch();
  initCurrentToolHighlight();
  updateSignaturePositionControls();
  initAnnotationPad();
  initSignaturePad();
  initTheme();
  initInstallPrompt();
  registerServiceWorker();
}());
