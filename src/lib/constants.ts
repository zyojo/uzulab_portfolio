import EXPERIMENT_ICON from '@/image/experiment_icon.svg'
import FLOW_IMG1 from '@/image/flow1.jpg'
import FLOW_IMG2 from '@/image/flow2.jpg'
import FLOW_IMG3 from '@/image/flow3.jpg'
import FLOW_IMG4 from '@/image/flow4.jpg'
import FLOW_IMG5 from '@/image/flow5.jpg'
import WEB_ICON from '@/image/pc_icon.svg'
import GRAPHIC_ICON from '@/image/stationary_icon.svg'

export const SKILLS_DATA = [
  {
    title: 'Webサイト・システム開発',
    image: WEB_ICON,
    desc: 'マルチデバイスに対応したデザインから実装までを一貫して行います。WordpressなどのCMSの導入や、ECサイトの立ち上げもお任せください。',
    skill: 'Javascript (React, React Native, Node.js) / Ruby on Rails / Wordpress / EC-CUBE',
  },
  {
    title: 'グラフィックデザイン',
    image: GRAPHIC_ICON,
    desc: 'ロゴやバナーなど、ディスプレイ上のグラフィックを中心に制作します。シンプルで素材の良さを素直に伝えるスタイルが得意です。印刷物もご相談ください。',
    skill: 'Figma / Adobe Illustrator / Photoshop / Xd / Hand Drawing',
  },
  {
    title: '新しい表現の実験',
    image: EXPERIMENT_ICON,
    desc: 'Generative Artや３Dプリンタ・Arduinoを使ったIoTプロトタイプの開発など、テクノロジーを用いた新しい表現の実験を行います。',
    skill: 'Three.js / Rhinoceros / Arduino / Processing',
  },
]

export const WORKFLOW_DATA = [
  {
    index: 1,
    title: '目的の確認',
    imgs: [FLOW_IMG1],
    desc: 'お声がけいただいた目的やお持ちの構想についてヒアリングします。ホームページを持とうと考えている場合でも、目的によってはより手軽に始められるサービスで十分な場合もあります。このプロジェクトを通して実現したいことは何か。それに応じて適切な制作物を検討します。',
  },
  {
    index: 2,
    title: '企画',
    imgs: [FLOW_IMG2],
    desc: 'ヒアリングによる目的確認の後、他社の印象やトレンドをリサーチします。それを踏まえて、今回のプロジェクトではどのようなアウトプットが必要か、またそれを実現するために必要なリソースやスケジュールを具体的にします。ご予算と工数のすり合わせもここで行います。',
  },
  {
    index: 3,
    title: 'デザイン制作',
    imgs: [FLOW_IMG3, FLOW_IMG4],
    desc: '機能と情緒の両面から視覚的な要素を構成していきます。WEBサイトの場合、ユーザーフローが確認できるワイヤーフレームを作り、要件の機能を果たすことができるか確認します。並行して情緒面により関わるカラーや写真の選定・加工などを進めていきます。モックアップでの確認を終えるとビジュアル面は一旦完了となり、実装段階に移行します。',
  },
  {
    index: 4,
    title: '実装・公開',
    imgs: [FLOW_IMG5],
    desc: 'バックエンドからフロントエンドのプログラミング、PCやスマートフォンなどマルチデバイスに対応した実装を行います。サイトの内容をご自身で更新いただくために、WordPressやECCUBEなどのCMSの導入や、お問い合わせフォームや予約フォームの実装など、ご要望に応じた開発を行います。',
  },
  {
    index: 5,
    title: '運用・改善',
    imgs: [],
    desc: '公開後の更新や、Google Analyticsによる効果測定による改善の提案などを行います。WordPressなどのCMSからご自身で更新される場合にもご要望があれば、更新マニュアルの作成や、レクチャーを行います。',
  },
]

export const metaData = {
  title: 'uzulab',
  description:
    'Web開発者としての知識とデザインの力を使って、より良い未来の姿を一緒に考え作リ上げるお手伝いをします。',
  favicon: {
    src: '/favicon.ico',
  },
  url: 'https://uzulab-portfolio.vercel.app',
  ogp: {
    width: 2400,
    height: 1260,
    src: 'https://images.microcms-assets.io/assets/a7f6beb5ca6e465cabb08c1d9b351ccb/3c5556e7723d49f5b553a0ca8d379ac3/uzulab_ogp.png',
  },
}

export const MAIN_URL = 'https://www.ryotanakahara.jp/'
