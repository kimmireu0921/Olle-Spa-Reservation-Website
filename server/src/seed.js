const SERVICES = [
  {
    name: { en: 'Swedish Massage', ko: '스웨디시 마사지', zh: '瑞典式按摩', ja: 'スウェディッシュマッサージ' },
    description: {
      en: 'A gentle, relaxing full-body massage using long, flowing strokes to ease tension and improve circulation.',
      ko: '부드럽고 리듬감 있는 손길로 긴장을 풀어주고 혈액순환을 도와주는 전신 마사지입니다.',
      zh: '采用柔和流畅的手法进行全身按摩，舒缓紧张情绪，促进血液循环。',
      ja: '長く流れるようなストロークで全身をほぐし、緊張を和らげ血行を促進する優しいマッサージです。',
    },
    duration_minutes: 60,
    price_cents: 8000,
  },
  {
    name: { en: 'Deep Tissue Massage', ko: '딥 티슈 마사지', zh: '深层组织按摩', ja: 'ディープティッシュマッサージ' },
    description: {
      en: 'Targeted, firm-pressure massage that reaches deeper muscle layers to relieve chronic tension and knots.',
      ko: '깊은 근육층까지 강한 압력으로 눌러 만성 긴장과 뭉침을 풀어주는 마사지입니다.',
      zh: '以较强的力度按压深层肌肉，缓解慢性紧张与结节。',
      ja: '深層の筋肉層まで働きかける、しっかりとした圧のマッサージで慢性的なコリを解消します。',
    },
    duration_minutes: 90,
    price_cents: 12000,
  },
  {
    name: { en: 'Foot Reflexology', ko: '발 반사 마사지', zh: '足部反射按摩', ja: 'フットリフレクソロジー' },
    description: {
      en: 'A soothing foot and lower-leg massage based on pressure-point techniques to promote relaxation.',
      ko: '지압 기법을 활용해 발과 종아리를 편안하게 풀어주는 마사지입니다.',
      zh: '运用穴位按压手法，舒缓双脚与小腿的疲劳。',
      ja: '指圧技術を用いて足と下腿をほぐす、心地よいマッサージです。',
    },
    duration_minutes: 45,
    price_cents: 6000,
  },
  {
    name: { en: 'Hot Stone Massage', ko: '핫스톤 마사지', zh: '热石按摩', ja: 'ホットストーンマッサージ' },
    description: {
      en: 'Warm basalt stones combined with massage strokes to melt away tension and deeply relax the body.',
      ko: '따뜻한 현무암을 이용한 마사지로 긴장을 녹이고 몸을 깊이 이완시켜 드립니다.',
      zh: '使用温热玄武岩配合按摩手法，深层放松身体，舒缓紧张。',
      ja: '温めた玄武岩を使用し、緊張を溶かして深くリラックスできるマッサージです。',
    },
    duration_minutes: 90,
    price_cents: 13000,
  },
  {
    name: { en: 'Couples Massage', ko: '커플 마사지', zh: '双人按摩', ja: 'カップルマッサージ' },
    description: {
      en: 'Two side-by-side massages in the same room, perfect for sharing a relaxing experience with someone special.',
      ko: '같은 공간에서 나란히 받는 두 사람을 위한 마사지로, 소중한 사람과 함께 힐링하기 좋습니다.',
      zh: '两人在同一房间并肩享受按摩，适合与特别的人一起放松身心。',
      ja: '同じ部屋で並んでお二人一緒に受けられるマッサージ。特別な人と癒しのひとときを。',
    },
    duration_minutes: 60,
    price_cents: 18000,
  },
];

const THERAPISTS = [
  {
    name: 'Jiho Park',
    photo_url: null,
    bio: {
      en: 'Jiho has over 8 years of experience in therapeutic and relaxation massage, with a focus on deep tissue techniques and sports recovery. (Placeholder profile — replace with your real staff bio.)',
      ko: '지호는 딥 티슈 기법과 스포츠 회복에 중점을 둔 8년 이상의 테라피 마사지 경력을 보유하고 있습니다. (샘플 프로필 — 실제 직원 정보로 교체해 주세요.)',
      zh: '志豪拥有8年以上的理疗与放松按摩经验，专注于深层组织手法与运动恢复。（示例资料——请替换为真实员工信息。）',
      ja: 'ジホは8年以上の経験を持つセラピストで、ディープティッシュ技術とスポーツリカバリーを専門としています。（サンプルプロフィール — 実際のスタッフ情報に置き換えてください。）',
    },
    specialties: {
      en: 'Deep Tissue, Sports Recovery, Hot Stone',
      ko: '딥 티슈, 스포츠 회복, 핫스톤',
      zh: '深层组织、运动恢复、热石',
      ja: 'ディープティッシュ、スポーツリカバリー、ホットストーン',
    },
  },
  {
    name: 'Soo-yeon Lee',
    photo_url: null,
    bio: {
      en: 'Soo-yeon specializes in Swedish massage, reflexology, and prenatal-safe relaxation techniques, with a calm and attentive approach. (Placeholder profile — replace with your real staff bio.)',
      ko: '수연은 스웨디시 마사지와 반사 마사지, 편안한 이완 기법을 전문으로 하며 차분하고 세심한 케어를 제공합니다. (샘플 프로필 — 실제 직원 정보로 교체해 주세요.)',
      zh: '秀妍专精于瑞典式按摩、足部反射及舒缓放松技巧，以细致沉稳的服务风格著称。（示例资料——请替换为真实员工信息。）',
      ja: 'スヨンはスウェディッシュマッサージ、リフレクソロジー、リラクゼーション技術を専門とし、落ち着いた丁寧な施術が特徴です。（サンプルプロフィール — 実際のスタッフ情報に置き換えてください。）',
    },
    specialties: {
      en: 'Swedish Massage, Reflexology, Relaxation',
      ko: '스웨디시 마사지, 반사 마사지, 릴렉세이션',
      zh: '瑞典式按摩、足部反射、放松护理',
      ja: 'スウェディッシュマッサージ、リフレクソロジー、リラクゼーション',
    },
  },
];

function seed(db) {
  const serviceCount = db.prepare('SELECT COUNT(*) AS c FROM services').get().c;
  if (serviceCount === 0) {
    const insert = db.prepare(`
      INSERT INTO services
        (name_en, name_ko, name_zh, name_ja, description_en, description_ko, description_zh, description_ja, duration_minutes, price_cents)
      VALUES (@name_en, @name_ko, @name_zh, @name_ja, @description_en, @description_ko, @description_zh, @description_ja, @duration_minutes, @price_cents)
    `);
    const insertMany = db.transaction((services) => {
      for (const s of services) {
        insert.run({
          name_en: s.name.en, name_ko: s.name.ko, name_zh: s.name.zh, name_ja: s.name.ja,
          description_en: s.description.en, description_ko: s.description.ko, description_zh: s.description.zh, description_ja: s.description.ja,
          duration_minutes: s.duration_minutes, price_cents: s.price_cents,
        });
      }
    });
    insertMany(SERVICES);
    console.log(`Seeded ${SERVICES.length} services.`);
  }

  const therapistCount = db.prepare('SELECT COUNT(*) AS c FROM therapists').get().c;
  if (therapistCount === 0) {
    const insert = db.prepare(`
      INSERT INTO therapists
        (name, photo_url, bio_en, bio_ko, bio_zh, bio_ja, specialties_en, specialties_ko, specialties_zh, specialties_ja)
      VALUES (@name, @photo_url, @bio_en, @bio_ko, @bio_zh, @bio_ja, @specialties_en, @specialties_ko, @specialties_zh, @specialties_ja)
    `);
    const insertMany = db.transaction((therapists) => {
      for (const t of therapists) {
        insert.run({
          name: t.name, photo_url: t.photo_url,
          bio_en: t.bio.en, bio_ko: t.bio.ko, bio_zh: t.bio.zh, bio_ja: t.bio.ja,
          specialties_en: t.specialties.en, specialties_ko: t.specialties.ko, specialties_zh: t.specialties.zh, specialties_ja: t.specialties.ja,
        });
      }
    });
    insertMany(THERAPISTS);
    console.log(`Seeded ${THERAPISTS.length} therapists.`);
  }

  const hoursCount = db.prepare('SELECT COUNT(*) AS c FROM business_hours').get().c;
  if (hoursCount === 0) {
    const insert = db.prepare('INSERT INTO business_hours (day_of_week, open_time, close_time) VALUES (?, ?, ?)');
    const insertMany = db.transaction(() => {
      insert.run(0, null, null); // Sunday closed
      for (let day = 1; day <= 6; day += 1) {
        insert.run(day, '09:00', '19:00');
      }
    });
    insertMany();
    console.log('Seeded business hours (Mon-Sat 09:00-19:00, Sun closed).');
  }
}

module.exports = seed;

if (require.main === module) {
  const db = require('./db');
  seed(db);
  console.log('Seed complete.');
}
