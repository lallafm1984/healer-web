import { privacy, terms } from "./content.js";

const translations = {
  "en": {
    "privacy": [
      [
        "overview",
        "1. About this privacy policy",
        "<p>4LTree (the “operator”) processes personal information of users of <strong>Solo Healer</strong> and its official website as described below. Contact <a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a> about privacy and your rights.</p><p>The game is a single-player game that starts with an automatic anonymous account. Progress and settings are stored on your device. Anonymous authentication supports service operations, including server time, notices, and update checks.</p>"
      ],
      [
        "data",
        "2. Information we process and why",
        "<p>The game processes an automatic anonymous user ID, authentication/session information, platform and app version, and sign-in events/times for service access, security, and error investigation. Characters, nicknames, level, equipment, currencies, guild members, progress, and settings are stored on your device. Launch counts are aggregated by platform and version without user IDs. Content start/result counts, session duration, and level/gold at session start and end are associated with the anonymous user ID for service operations and error investigation. Screens, tabs, and typed input are not collected.</p><p>Support email addresses, inquiry contents, and voluntary attachments are used to respond and handle privacy requests. Communication and hosting providers may process access logs, including IP address, request time, browser, and device information.</p><p>The game’s Google AdMob SDK may process IP addresses, advertising interactions, diagnostics, and device/advertising identifiers for advertising, analytics, and fraud prevention. Where available, you can change advertising privacy choices through the consent screen and advertising privacy settings.</p>"
      ],
      [
        "collection",
        "3. Collection and choices",
        "<p>Information is processed through automatic anonymous authentication, service communications, local storage, and emails you send. Google linking and server progress backup/restoration are unavailable. Progress cannot be recovered if local saves are lost after clearing app data, uninstalling, or changing devices.</p><p>This website has no separate advertising or behavioral analytics scripts or tracking cookies. A functional cookie remembers only your selected language code for up to 180 days. A language in the URL takes priority.</p>"
      ],
      [
        "providers",
        "4. Providers and transfers",
        "<p>The operator does not sell personal information. We use these service providers.</p><ul><li><strong>Supabase</strong>: automatic anonymous authentication, sessions and sign-in records, server time, notices, update configuration, and aggregate statistics. The game database uses the Seoul region. <a href=\"https://supabase.com/privacy\">Supabase Privacy Policy</a></li><li><strong>Google</strong>: AdMob advertising and privacy choices, and Gmail support email. Information may be processed on global infrastructure, including in the United States. <a href=\"https://policies.google.com/privacy?hl=en\">Google Privacy Policy</a> · <a href=\"https://developers.google.com/admob/android/privacy/play-data-disclosure\">Advertising SDK data disclosure</a></li></ul><p><strong>Website hosting (Vercel)</strong>: IP address, request time, browser, and other access information may be processed on global infrastructure, including in the United States, to deliver and protect the website. <a href=\"https://vercel.com/legal/privacy-notice\">Vercel Privacy Notice</a>. Retention and overseas processing depend on the providers’ services and contracts.</p>"
      ],
      [
        "retention",
        "5. Retention and deletion",
        "<ul><li><strong>Anonymous authentication/session information</strong>: processed as needed for authentication and service security. Clearing app data or uninstalling removes device credentials, but does not immediately delete server records.</li><li><strong>Sign-in and session summary records</strong>: normally retained for 60 days, with expired records removed during cleanup.</li><li><strong>Local progress and settings</strong>: retained until app data is cleared or the app is uninstalled.</li><li><strong>Support emails and privacy requests</strong>: deleted within 30 days after the completion notice, or after further requested handling is complete.</li></ul><p>Privacy requests about server data created by earlier versions can also be sent to support. Advertising, authentication, email, and hosting providers handle their own records under their policies and contracts.</p>"
      ],
      [
        "rights",
        "6. Your rights and deleting data",
        "<p>You may request access, correction, deletion, suspension of processing, or withdrawal of consent at <a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a>. We will explain the minimum information needed to verify your identity and reply with the outcome. Legal representatives can use the same contact.</p><p>To erase local progress, use Android Settings → Apps → Solo Healer → Storage → Clear data, or uninstall the app. The game cannot recover deleted local progress. Email support about server-side anonymous authentication and sign-in records.</p>"
      ],
      [
        "security",
        "7. Security",
        "<p>Authentication and service communications use HTTPS. Operational access is limited as needed. Use device security features such as a screen lock to protect local progress. Do not attach passwords, verification codes, identity documents, or other sensitive materials to inquiries.</p>"
      ],
      [
        "children",
        "8. Children’s personal information",
        "<p>Where processing personal information of a user under 14 requires consent, we verify consent from a legal representative in accordance with applicable law. If you learn that a child’s information was processed without required consent, contact the operator so we can investigate and take necessary steps, including deletion.</p>"
      ],
      [
        "changes",
        "9. Changes and contact",
        "<p>If key matters such as processing purposes, information categories, or providers change, we will publish the updated policy and effective date on the website and obtain separate consent where necessary.</p><p><strong>Operator and privacy contact:</strong> 4LTree<br><strong>Email:</strong> <a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a><br><strong>Effective / last updated:</strong> November 3, 2026</p>"
      ]
    ],
    "terms": [
      [
        "service",
        "1. Service and terms",
        "<p>These terms explain the conditions for using Solo Healer, provided by 4LTree. The available content, features, and regions depend on the distributed version and store listing.</p>"
      ],
      [
        "play",
        "2. Playing and saving",
        "<p>The game uses an automatic anonymous account and saves progress on your device. Google linking and server progress backup/restoration are unavailable. If local saves are lost after clearing app data, uninstalling, or changing devices, progress cannot be recovered. Shop purchases are planned for a future update. Payment and restoration support will be explained before purchases become available.</p>"
      ],
      [
        "fair",
        "3. Fair use",
        "<p>Exploiting game/server vulnerabilities, tampering with save or communications data, sending abnormal requests that disrupt operations, and infringing rights are prohibited. After verifying the facts, the operator may impose the minimum necessary restrictions. You may appeal through the support email.</p>"
      ],
      [
        "payment",
        "4. Purchases and refunds",
        "<p>In versions offering paid products, the product details, prices, and conditions displayed by the store before purchase apply. Cancellations and refunds follow applicable law and Google Play policies. For help, contact the operator with your order number. This website does not accept payments.</p>"
      ],
      [
        "operation",
        "5. Service changes and data",
        "<p>Features may change, or online features may be temporarily suspended, for updates, security, or maintenance. Significant changes or service termination will be announced in advance where possible. These terms do not exclude liability for the operator’s intentional or negligent acts, or restrict your statutory rights.</p><p>Rights to game images, audio, text, software, and other materials belong to the operator or their rightful owners. Unauthorized redistribution or commercial use is prohibited, except as permitted by applicable law.</p>"
      ],
      [
        "end",
        "6. Ending use and contact",
        "<p>You can stop using the app at any time and erase local progress by clearing app data or uninstalling. Submit privacy requests by email through <a href=\"/support/\">Support</a>; they are handled under the <a href=\"/privacy/\">Privacy Policy</a>.</p><p>Contact: <a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a><br>Operator: 4LTree<br>Effective / last updated: November 3, 2026</p>"
      ]
    ]
  },
  "ja": {
    "privacy": [
      [
        "overview",
        "1. プライバシーポリシーについて",
        "<p>4LTree（以下「運営者」）は、<strong>ソロヒーラー（Solo Healer）</strong>および公式ウェブサイトの利用者の個人情報を、以下のとおり取り扱います。個人情報の保護や権利行使に関する連絡先は <a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a> です。</p><p>本ゲームは、自動匿名アカウントで開始するシングルプレイゲームです。進行状況と設定は端末に保存し、サーバー時刻・お知らせ・更新確認などの運営に匿名認証を使用します。</p>"
      ],
      [
        "data",
        "2. 取り扱う情報と利用目的",
        "<p>サービスへのアクセス、安全対策、不具合調査のため、自動匿名ユーザーID、認証・セッション情報、プラットフォーム、アプリのバージョン、ログインイベント・時刻を処理します。キャラクター、ニックネーム、レベル、装備、通貨、ギルドメンバー、進行状況、設定は端末に保存します。起動回数はユーザーIDを含めず、プラットフォーム・バージョン別に集計します。コンテンツの出発・結果回数、接続時間、接続開始・終了時のレベルとゴールドは、匿名ユーザーIDと紐付けて運営と不具合調査に使用します。画面・タブ・入力内容は収集しません。</p><p>サポートのメールアドレス、問い合わせ内容、任意の添付資料は、問い合わせ対応と個人情報の権利行使に使用します。通信・ホスティング事業者はIPアドレス、リクエスト時刻、ブラウザー・端末情報などのアクセスログを処理する場合があります。</p><p>ゲームのGoogle AdMob SDKは、広告配信・分析・不正防止のため、IPアドレス、広告の操作、診断情報、端末・広告識別子を処理する場合があります。利用可能な場合、同意画面と広告プライバシー設定で選択を変更できます。</p>"
      ],
      [
        "collection",
        "3. 収集方法と選択",
        "<p>自動匿名認証、サービスの通信、端末内保存、利用者が送信するメールを通じて情報を処理します。Google連携およびサーバーへの進行状況のバックアップ・復元は提供していません。アプリデータの削除、アンインストール、機種変更で端末の保存データを失うと、進行状況は復元できません。</p><p>本サイトには独自の広告・行動分析スクリプトや追跡Cookieはありません。言語コードだけを最長180日記憶する機能性Cookieを使用し、URLの言語指定を優先します。</p>"
      ],
      [
        "providers",
        "4. 提供者と国外での処理",
        "<p>運営者は個人情報を販売しません。サービスに以下の事業者を利用します。</p><ul><li><strong>Supabase</strong>：自動匿名認証、セッション・ログイン記録、サーバー時刻、お知らせ、更新設定、集計統計を処理します。ゲームのデータベースはソウルリージョンです。<a href=\"https://supabase.com/privacy\">Supabaseプライバシーポリシー</a></li><li><strong>Google</strong>：AdMob広告・プライバシー選択、Gmailによるサポートメールを処理します。米国などのグローバル基盤で処理される場合があります。<a href=\"https://policies.google.com/privacy?hl=ja\">Googleプライバシーポリシー</a> · <a href=\"https://developers.google.com/admob/android/privacy/play-data-disclosure\">広告SDKのデータ処理案内</a></li></ul><p><strong>ウェブサイトのホスティング（Vercel）</strong>：ページ配信と保護のため、IPアドレス、時刻、ブラウザーなどのアクセス情報を米国などで処理する場合があります。<a href=\"https://vercel.com/legal/privacy-notice\">Vercelプライバシー通知</a>。保存や国外処理は各サービスの方針と契約に従います。</p>"
      ],
      [
        "retention",
        "5. 保存期間と削除",
        "<ul><li><strong>匿名認証・セッション情報</strong>：認証と安全対策に必要な間処理します。データ削除やアンインストールで端末の認証情報は消えますが、サーバー記録が即時に消えるわけではありません。</li><li><strong>ログイン・接続ごとの利用要約記録</strong>：原則60日保存し、期限切れの記録は整理時に削除します。</li><li><strong>端末内の進行状況・設定</strong>：アプリデータの削除またはアンインストールまで保存します。</li><li><strong>サポートメール・個人情報の依頼</strong>：完了案内後30日以内に削除します。追加対応がある場合は、その完了時点を基準とします。</li></ul><p>旧バージョンで作成されたサーバー資料への個人情報の依頼も、サポートメールで受け付けます。広告・認証・メール・ホスティング事業者の独自の記録は、各事業者の方針と契約に従います。</p>"
      ],
      [
        "rights",
        "6. 利用者の権利とデータ削除",
        "<p>個人情報の開示、訂正、削除、処理停止、同意撤回は、<a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a>へ依頼できます。本人確認に必要な最小限の情報を別途案内し、処理結果を返信します。法定代理人も同じ連絡先を利用できます。</p><p>端末内の進行状況は、Android設定 → アプリ → ソロヒーラー → ストレージ → データを削除、またはアンインストールで消去できます。削除した進行状況はゲームから復元できません。サーバーの匿名認証・ログイン記録についてはメールでお問い合わせください。</p>"
      ],
      [
        "security",
        "7. 安全な取り扱い",
        "<p>認証とサービスの通信にはHTTPSを使用し、運用上のアクセス権限を必要な範囲に限定します。端末の進行状況を守るため画面ロックなどをご利用ください。パスワード、認証コード、身分証などの機密資料は添付しないでください。</p>"
      ],
      [
        "children",
        "8. 児童の個人情報",
        "<p>14歳未満の利用者の個人情報を同意に基づいて処理する必要がある場合は、関連法令に従って法定代理人の同意を確認します。必要な同意なく児童の個人情報が処理されたことが分かった場合は、運営者にご連絡ください。確認後、削除など必要な措置を行います。</p>"
      ],
      [
        "changes",
        "9. 変更とお問い合わせ",
        "<p>処理目的、情報の種類、提供者などの重要事項を変更する場合は、変更後のポリシーと適用日をサイトで案内し、必要に応じて別途同意を取得します。</p><p><strong>運営者・個人情報に関するお問い合わせ：</strong>4LTree<br><strong>メール：</strong><a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a><br><strong>施行・最終更新日：</strong>2026年11月3日</p>"
      ]
    ],
    "terms": [
      [
        "service",
        "1. サービスと本規約",
        "<p>本規約は、4LTreeが提供するソロヒーラー（Solo Healer）の利用条件を説明します。具体的なコンテンツ、利用可能な機能、提供地域は、配信バージョンとストアの案内に従います。</p>"
      ],
      [
        "play",
        "2. プレイと保存",
        "<p>自動匿名アカウントを使用し、進行状況は端末に保存します。Google連携、サーバーへの進行状況のバックアップ・復元は提供していません。データ削除、アンインストール、機種変更で端末の保存データを失うと、進行状況は復元できません。ショップ購入は今後提供予定です。提供時には購入前に決済と復元の対応範囲を別途案内します。</p>"
      ],
      [
        "fair",
        "3. 公正な利用",
        "<p>ゲーム・サーバーの脆弱性の悪用、保存・通信情報の改ざん、サービス運営を妨げる不正なリクエスト、権利侵害を禁止します。運営者は事実を確認したうえで、必要最小限の利用制限を行う場合があります。利用者はサポートメールから異議を申し立てることができます。</p>"
      ],
      [
        "payment",
        "4. 購入と返金",
        "<p>有料商品を提供するバージョンでは、購入前のストア決済画面に表示される商品内容、価格、提供条件が適用されます。購入のキャンセル・返金は、関連法令とGoogle Playのポリシーに従います。サポートが必要な場合は、注文番号を添えて運営者にお問い合わせください。本サイトでは決済を受け付けません。</p>"
      ],
      [
        "operation",
        "5. サービスの変更とデータ",
        "<p>アップデート、安全対策、メンテナンスなどにより、機能を変更したりオンライン機能を一時停止したりする場合があります。重大な変更や終了は、可能な範囲で事前に案内します。運営者の故意または過失に基づく責任を免除せず、利用者の法定の権利を制限しません。</p><p>ゲームの画像、音源、文章、プログラムなどの権利は、運営者または正当な権利者に帰属します。関連法令で認められる利用を除き、無断での再配布や商業利用を禁止します。</p>"
      ],
      [
        "end",
        "6. 利用終了とお問い合わせ",
        "<p>いつでも利用を終了でき、アプリデータの削除またはアンインストールで端末の進行状況を消去できます。個人情報の依頼は<a href=\"/support/\">サポート</a>からメールで受け付け、<a href=\"/privacy/\">プライバシーポリシー</a>に従って処理します。</p><p>お問い合わせ：<a href=\"mailto:4ltree.service@gmail.com\">4ltree.service@gmail.com</a><br>運営者：4LTree<br>施行・最終更新日：2026年11月3日</p>"
      ]
    ]
  }
};
const documents = { ko: { privacy, terms }, ...translations };
export function legalSections(kind, { lang, href }) {
  return documents[lang][kind].map(([id, heading, html]) => [id, heading, html.replace(/href="(\/[^"\s]*)"/g, (_, path) => `href="${href(path)}"`)]);
}
