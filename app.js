(() => {
  'use strict';

  const STORAGE_KEY = 'habit_fantasy_a3_state_v1';

  const EFFORT_CONFIG = {
    'Fácil':   { xp: 15, damage: 16, selfDamage: 14, label: '+XP' },
    'Médio':   { xp: 25, damage: 24, selfDamage: 22, label: '++XP' },
    'Difícil': { xp: 35, damage: 34, selfDamage: 30, label: '+++XP' },
    'Extremo': { xp: 45, damage: 46, selfDamage: 38, label: '++++XP' },
  };

  const COSMETIC_ITEMS = [
    { id: 'hat-brown',   name: 'Chapéu de Aventureiro', color: '#8B5A2B', type: 'hat' },
    { id: 'cape-green',  name: 'Capa do Goblin',        color: '#4EA832', type: 'cape' },
    { id: 'sword-steel', name: 'Espada de Aço',         color: '#828B8F', type: 'sword' },
    { id: 'hat-red',     name: 'Bandana Rubra',         color: '#E04A4A', type: 'hat' },
    { id: 'cape-purple', name: 'Manto Sombrio',         color: '#7B4EB2', type: 'cape' },
    { id: 'sword-gold',  name: 'Lâmina Dourada',        color: '#E5C130', type: 'sword' },
  ];

  const HABIT_CATEGORIES = [
    {
      name: 'Saúde & Bem-estar', color: '#E04A4A',
      presets: [
        { emoji: '💧', title: 'Beber Água', desc: 'Manter hidratação ao longo do dia', effort: 'Fácil' },
        { emoji: '🪥', title: 'Escovar os Dentes', desc: 'Após as principais refeições', effort: 'Fácil' },
        { emoji: '🥗', title: 'Refeição Saudável', desc: 'Incluir vegetais e frutas', effort: 'Médio' },
      ]
    },
    {
      name: 'Saúde Mental', color: '#4BA3E3',
      presets: [
        { emoji: '😊', title: 'Pensar Positivo', desc: 'Manter pensamentos positivos', effort: 'Fácil' },
        { emoji: '🧘', title: 'Meditar 10 Minutos', desc: 'Pausa para respiração e foco', effort: 'Médio' },
        { emoji: '📓', title: 'Escrever no Diário', desc: 'Registrar sentimentos do dia', effort: 'Fácil' },
      ]
    },
    {
      name: 'Desenvolvimento Pessoal', color: '#E6C229',
      presets: [
        { emoji: '📖', title: 'Ler 15 Páginas', desc: 'Leitura diária antes de dormir', effort: 'Médio' },
        { emoji: '🎧', title: 'Estudar Idioma', desc: 'Praticar vocabulário e escuta', effort: 'Médio' },
        { emoji: '💻', title: 'Praticar Programação', desc: 'Resolver exercícios ou projeto', effort: 'Difícil' },
      ]
    },
    {
      name: 'Produtividade', color: '#F2994A',
      presets: [
        { emoji: '🗂️', title: 'Organizar Espaço de Trabalho', desc: 'Organizar a mesa ou área de trabalho', effort: 'Fácil' },
        { emoji: '🎯', title: 'Definir Metas do Dia', desc: 'Listar 3 prioridades pela manhã', effort: 'Fácil' },
        { emoji: '📵', title: 'Foco Sem Celular', desc: '1 hora longe de redes sociais', effort: 'Difícil' },
      ]
    },
    {
      name: 'Trabalho Doméstico', color: '#9B51E0',
      presets: [
        { emoji: '🛏️', title: 'Arrumar a Cama', desc: 'Logo ao acordar', effort: 'Fácil' },
        { emoji: '🍽️', title: 'Lavar a Louça', desc: 'Deixar a pia limpa após refeições', effort: 'Médio' },
        { emoji: '🗑️', title: 'Tirar o Lixo', desc: 'Levar o lixo para fora', effort: 'Fácil' },
      ]
    },
  ];

  const TASK_CATEGORIES = [
    {
      name: 'Rotina e Estilo de Vida', color: '#56CCF2',
      presets: [
        { emoji: '🎸', title: 'Praticar Instrumento', desc: 'Passar tempo treinando instrumento musical', effort: 'Médio', checklist: ['Aquecimento', 'Escalas', 'Música nova'] },
        { emoji: '☀️', title: 'Planejar a Semana', desc: 'Organizar compromissos da semana', effort: 'Fácil', checklist: ['Agenda', 'Prioridades'] },
        { emoji: '🎒', title: 'Preparar Mochila', desc: 'Deixar tudo pronto para amanhã', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Saúde e Bem-estar', color: '#E04A4A',
      presets: [
        { emoji: '🩺', title: 'Agendar Consulta Médica', desc: 'Marcar check-up anual', effort: 'Fácil', checklist: ['Escolher clínica', 'Confirmar horário'] },
        { emoji: '🏃', title: 'Correr 5 km', desc: 'Completar treino ao ar livre', effort: 'Difícil', checklist: ['Alongamento', 'Hidratação'] },
        { emoji: '💊', title: 'Comprar Vitaminas', desc: 'Passar na farmácia', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Desenvolvimento Pessoal', color: '#E6C229',
      presets: [
        { emoji: '📝', title: 'Entregar Trabalho da Faculdade', desc: 'Finalizar e enviar no Moodle', effort: 'Difícil', checklist: ['Revisar texto', 'Gerar PDF'] },
        { emoji: '📚', title: 'Resumir Capítulo', desc: 'Fazer anotações dos pontos principais', effort: 'Médio', checklist: [] },
        { emoji: '🎓', title: 'Assistir Aula Gravada', desc: 'Completar módulo pendente', effort: 'Médio', checklist: [] },
      ]
    },
    {
      name: 'Produtividade', color: '#F2994A',
      presets: [
        { emoji: '📧', title: 'Limpar Caixa de Entrada', desc: 'Responder e arquivar e-mails pendentes', effort: 'Médio', checklist: [] },
        { emoji: '📁', title: 'Fazer Backup de Arquivos', desc: 'Salvar documentos na nuvem', effort: 'Fácil', checklist: [] },
        { emoji: '🗓️', title: 'Revisar Prazos', desc: 'Conferir entregas da semana', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Tarefas Domésticas', color: '#9B51E0',
      presets: [
        { emoji: '🛒', title: 'Fazer Compras da Semana', desc: 'Ir ao mercado com a lista pronta', effort: 'Médio', checklist: ['Frutas', 'Verduras', 'Limpeza'] },
        { emoji: '🧹', title: 'Limpar o Quarto', desc: 'Varrer e organizar objetos', effort: 'Médio', checklist: [] },
        { emoji: '🧺', title: 'Lavar Roupas', desc: 'Separar e colocar na máquina', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Finanças', color: '#27C948',
      presets: [
        { emoji: '💰', title: 'Organizar Finanças do Mês', desc: 'Conferir faturas e despesas fixas', effort: 'Difícil', checklist: ['Revisar cartão', 'Pagar contas'] },
        { emoji: '🧾', title: 'Pagar Boleto', desc: 'Quitar conta antes do vencimento', effort: 'Fácil', checklist: [] },
        { emoji: '📊', title: 'Atualizar Planilha de Gastos', desc: 'Registrar compras da semana', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Relações Interpessoais', color: '#2B90EA',
      presets: [
        { emoji: '📞', title: 'Ligar para a Família', desc: 'Conversar e colocar o papo em dia', effort: 'Fácil', checklist: [] },
        { emoji: '🎁', title: 'Comprar Presente', desc: 'Escolher lembrança de aniversário', effort: 'Médio', checklist: [] },
        { emoji: '☕', title: 'Encontrar Amigos', desc: 'Marcar café ou conversa', effort: 'Fácil', checklist: [] },
      ]
    },
    {
      name: 'Descanso e Lazer', color: '#2D9CDB',
      presets: [
        { emoji: '💆', title: 'Receber Massagem', desc: 'Reservar massagem corporal para aliviar o estresse', effort: 'Fácil', checklist: ['Confirmar agendamento'] },
        { emoji: '🎬', title: 'Assistir Filme', desc: 'Reservar tempo para relaxar', effort: 'Fácil', checklist: [] },
        { emoji: '🎮', title: 'Jogar Videogame', desc: 'Sessão de lazer no fim do dia', effort: 'Fácil', checklist: [] },
      ]
    },
  ];

  const MONSTER_TEMPLATES = [
    {
      kind: 'goblin',
      name: 'Goblin da Fúria',
      drops: [
        { id: 'cape-green', type: 'cape', color: '#4EA832', label: 'Capa do Goblin' },
        { id: 'sword-steel', type: 'sword', color: '#828B8F', label: 'Espada de Aço' },
      ]
    },
    {
      kind: 'mini',
      name: 'Mini Goblin',
      drops: [
        { id: 'cape-green', type: 'cape', color: '#4EA832', label: 'Capa do Goblin' },
        { id: 'sword-gold', type: 'sword', color: '#E5C130', label: 'Lâmina Dourada' },
      ]
    },
    {
      kind: 'tronco',
      name: 'Tronco Preguiçoso',
      drops: [
        { id: 'hat-brown', type: 'hat', color: '#8B5A2B', label: 'Chapéu de Aventureiro' },
        { id: 'hat-red', type: 'hat', color: '#E04A4A', label: 'Bandana Rubra' },
      ]
    },
    {
      kind: 'morcego',
      name: 'Morcego Sombrio',
      drops: [
        { id: 'cape-purple', type: 'cape', color: '#7B4EB2', label: 'Manto Sombrio' },
        { id: 'sword-steel', type: 'sword', color: '#828B8F', label: 'Espada de Aço' },
      ]
    },
  ];

  const STAGE_COLORS = ['#7BC638', '#38A89D', '#7B5EA7', '#C68B38'];

  function createStageMonsters(stage) {
    return MONSTER_TEMPLATES.map((tpl, idx) => ({
      id: `m-${tpl.kind}-${stage}-${idx}`,
      kind: tpl.kind,
      name: tpl.name,
      hp: 100,
      drops: tpl.drops,
    }));
  }

  function createDefaultState() {
    return {
      activeTab: 'habito',
      stage: 1,
      hero: {
        level: 2,
        xp: 57,
        hp: 100,
        maxHpCap: 100,
        attack: 11,
        unlockedItems: ['hat-brown'],
        equippedItem: null,
      },
      combatFeedback: {
        text: 'Dano no Goblin · +XP',
        isDamage: false,
      },
      monsters: createStageMonsters(1),
      habits: [
        {
          id: 'h-1',
          title: 'Abrir o Habit Fantasy',
          desc: '',
          good: 0,
          bad: 0,
          effort: 'Fácil',
          resetFreq: 'Diariamente',
          notify: false,
        },
        {
          id: 'h-2',
          title: 'Pensar Positivo',
          desc: 'Manter pensamentos positivos',
          good: 0,
          bad: 0,
          effort: 'Médio',
          resetFreq: 'Diariamente',
          notify: false,
        },
        {
          id: 'h-3',
          title: 'Organizar Espaço de Trabalho',
          desc: 'Organizar a mesa ou área de trabalho',
          good: 0,
          bad: 0,
          effort: 'Médio',
          resetFreq: 'Diariamente',
          notify: false,
        },
      ],
      tasks: [
        {
          id: 't-1',
          title: 'Praticar Instrumento',
          desc: 'Passar tempo treinando instrumento musical',
          dateLabel: '17/11',
          dueDate: '2026-11-17',
          repeat: 'Diária',
          effort: 'Médio',
          done: false,
          overdue: false,
          expanded: false,
          checklist: [
            { text: 'Aquecimento (5 minutos)', checked: false },
            { text: 'Treinar acordes', checked: false },
            { text: 'Tocar música completa', checked: false },
          ],
          lastActionSnapshot: null,
        },
        {
          id: 't-2',
          title: 'Receber Massagem',
          desc: 'Reservar massagem corporal para aliviar o estresse',
          dateLabel: '17/11',
          dueDate: '2026-11-17',
          repeat: 'Nenhuma',
          effort: 'Difícil',
          done: true,
          overdue: false,
          expanded: false,
          checklist: [
            { text: 'Confirmar horário', checked: false },
          ],
          lastActionSnapshot: null,
        },
        {
          id: 't-3',
          title: 'Praticar Instrumento',
          desc: 'Passar tempo treinando instrumento musical',
          dateLabel: '31/10',
          dueDate: '2026-10-31',
          repeat: 'Diária',
          effort: 'Médio',
          done: false,
          overdue: true,
          expanded: false,
          checklist: [
            { text: 'Aquecimento (5 minutos)', checked: false },
            { text: 'Treinar escalas', checked: false },
            { text: 'Revisar repertório', checked: false },
          ],
          lastActionSnapshot: null,
        },
      ],
      habitUndoStack: [],
      sortMode: 0,
      filterMode: 0,
      pendingDeathFromLevel: 2,
    };
  }

  let state = createDefaultState();
  let taskFormChecklist = ['item 1'];

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }

  function getItemSvg(type, color, size = 24) {
    if (type === 'hat') {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M5 19h18l-3.5-9h-11L5 19z" stroke="${color}" stroke-width="2.2" fill="${color}" fill-opacity="0.35" stroke-linejoin="round"/>
          <path d="M3 19h22" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
        </svg>
      `;
    }
    if (type === 'cape') {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M9 6h10l3 16H6L9 6z" stroke="${color}" stroke-width="2.2" fill="${color}" fill-opacity="0.3" stroke-linejoin="round"/>
          <path d="M10 6c2 2 6 2 8 0" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
    if (type === 'sword') {
      return `
        <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M7 21L21 7M17 7h4v4M9 15l4 4" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="9" r="4" stroke="#A6A6A6" stroke-width="2"/>
        <path d="M14 13v9M8 17l6-2 6 2" stroke="#A6A6A6" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
  }

  // ==================== STICK-FIGURE SVGs ====================
  function getHeroSvg(stroke, w, h, equippedId) {
    const item = COSMETIC_ITEMS.find((i) => i.id === equippedId);
    const swordStroke = item && item.type === 'sword' ? item.color : stroke;
    const hatSvg = item && item.type === 'hat'
      ? `<path d="M12 10h16l-3-6H15l-3 6z" stroke="${item.color}" stroke-width="2.2" fill="${item.color}" fill-opacity="0.35"/>`
      : '';
    const capeSvg = item && item.type === 'cape'
      ? `<path d="M20 20l-9 17h7" stroke="${item.color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`
      : '';
    return `
      <svg width="${w}" height="${h}" viewBox="0 0 48 56" fill="none" aria-hidden="true">
        ${capeSvg}
        ${hatSvg}
        <circle cx="20" cy="14" r="6" stroke="${stroke}" stroke-width="2.5"/>
        <path d="M20 20v15M10 26l10-3 10 3M20 35l-7 13M20 35l7 13" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M31 25l8-12M34 22l3 2" stroke="${swordStroke}" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  function getMonsterSvg(kind, stroke, w, h) {
    if (kind === 'tronco') {
      return `
        <svg width="${w}" height="${h}" viewBox="0 0 48 56" fill="none" aria-hidden="true">
          <path d="M15 14h18l2 34H13l2-34z" stroke="${stroke}" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="20" cy="25" r="1.6" fill="${stroke}"/>
          <circle cx="28" cy="25" r="1.6" fill="${stroke}"/>
          <path d="M19 33l2.5-2 2.5 2 2.5-2 2.5 2" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M34 24c4-3 7-2 8 1-3 2-6 1-8-1z" stroke="${stroke}" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      `;
    }
    if (kind === 'morcego') {
      return `
        <svg width="${w}" height="${h}" viewBox="0 0 48 44" fill="none" aria-hidden="true">
          <path d="M18 14l-2-6 4 4M30 14l2-6-4 4" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="24" cy="20" r="7" stroke="${stroke}" stroke-width="2.5"/>
          <circle cx="21.5" cy="19" r="1.3" fill="${stroke}"/>
          <circle cx="26.5" cy="19" r="1.3" fill="${stroke}"/>
          <path d="M17 20C11 14 5 17 4 24c4-1 8 0 13-2M31 20c6-6 12-3 13 4-4-1-8 0-13-2" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
    return `
      <svg width="${w}" height="${h}" viewBox="0 0 48 56" fill="none" aria-hidden="true">
        <path d="M18 9l-5-4 2 7M30 9l5-4-2 7" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="24" cy="13" r="6" stroke="${stroke}" stroke-width="2.5"/>
        <path d="M24 19v16M14 25l10-3 10 3M24 35l-7 13M24 35l7 13" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 25l-5-10" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `;
  }

  // ==================== DOM REFERENCES ====================
  const el = {
    viewMain: document.getElementById('view-main'),
    viewHabitForm: document.getElementById('view-habit-form'),
    viewTaskForm: document.getElementById('view-task-form'),
    viewDeath: document.getElementById('view-death'),

    stagePill: document.getElementById('stage-pill'),
    combatFeedback: document.getElementById('combat-feedback'),
    heroBtn: document.getElementById('hero-btn'),
    heroHpFill: document.getElementById('hero-hp-fill'),
    heroArenaSprite: document.getElementById('hero-arena-sprite'),
    monstersRow: document.getElementById('monsters-row'),

    levelLabel: document.getElementById('level-label'),
    xpPctLabel: document.getElementById('xp-pct-label'),
    xpBarFill: document.getElementById('xp-bar-fill'),
    todayTasksCount: document.getElementById('today-tasks-count'),
    todayTasksFill: document.getElementById('today-tasks-fill'),

    sortLabel: document.getElementById('sort-label'),
    filterLabel: document.getElementById('filter-label'),
    tabSubtitle: document.getElementById('tab-subtitle'),

    tabHabito: document.getElementById('tab-habito'),
    tabTarefa: document.getElementById('tab-tarefa'),
    tabPlaceholder: document.getElementById('tab-placeholder'),
    placeholderTitle: document.getElementById('placeholder-title'),
    habitsList: document.getElementById('habits-list'),
    tasksSections: document.getElementById('tasks-sections'),

    btnUndoHabit: document.getElementById('btn-undo-habit'),
    btnFabAdd: document.getElementById('btn-fab-add'),
    fabAddLabel: document.getElementById('fab-add-label'),
    navItems: document.querySelectorAll('.nav-item'),

    // Forms
    formNewHabit: document.getElementById('form-new-habit'),
    habitTitle: document.getElementById('habit-title'),
    habitTitleErr: document.getElementById('habit-title-err'),
    habitDesc: document.getElementById('habit-desc'),
    habitNotify: document.getElementById('habit-notify'),

    formNewTask: document.getElementById('form-new-task'),
    taskTitle: document.getElementById('task-title'),
    taskTitleErr: document.getElementById('task-title-err'),
    taskDesc: document.getElementById('task-desc'),
    checklistEditor: document.getElementById('checklist-items-editor'),
    checklistNewInput: document.getElementById('checklist-new-input'),
    btnAddChecklist: document.getElementById('btn-add-checklist'),
    taskDate: document.getElementById('task-date'),
    taskDateEmptyBtn: document.getElementById('task-date-empty-btn'),
    taskDateActiveWrap: document.getElementById('task-date-active-wrap'),
    taskDateText: document.getElementById('task-date-text'),
    taskDateClearBtn: document.getElementById('task-date-clear-btn'),
    taskRepeat: document.getElementById('task-repeat'),
    taskNotify: document.getElementById('task-notify'),

    // Dialogs
    dialogHabitCat: document.getElementById('dialog-habit-cat'),
    habitCategoriesList: document.getElementById('habit-categories-list'),
    dialogTaskCat: document.getElementById('dialog-task-cat'),
    taskCategoriesList: document.getElementById('task-categories-list'),

    dialogMonster: document.getElementById('dialog-monster'),
    monsterDialogHpFill: document.getElementById('monster-dialog-hp-fill'),
    monsterDialogSprite: document.getElementById('monster-dialog-sprite'),
    monsterDialogName: document.getElementById('monster-dialog-name'),
    monsterDialogDrops: document.getElementById('monster-dialog-drops'),

    dialogHero: document.getElementById('dialog-hero'),
    heroDialogHpFill: document.getElementById('hero-dialog-hp-fill'),
    heroDialogSprite: document.getElementById('hero-dialog-sprite'),
    heroDialogLevel: document.getElementById('hero-dialog-level'),
    heroDialogAtk: document.getElementById('hero-dialog-atk'),
    heroDialogHp: document.getElementById('hero-dialog-hp'),

    dialogLevelup: document.getElementById('dialog-levelup'),
    levelupSprite: document.getElementById('levelup-sprite'),
    levelupFrom: document.getElementById('levelup-from'),
    levelupTo: document.getElementById('levelup-to'),
    levelupItemSwatch: document.getElementById('levelup-item-swatch'),
    levelupItemName: document.getElementById('levelup-item-name'),

    dialogCustomize: document.getElementById('dialog-customize'),
    customizeHeroSprite: document.getElementById('customize-hero-sprite'),
    customizeEquippedLabel: document.getElementById('customize-equipped-label'),
    customizeItemsList: document.getElementById('customize-items-list'),

    dialogMenu: document.getElementById('dialog-menu'),

    // Death screen
    deathStageLabel: document.getElementById('death-stage-label'),
    deathLvlFrom: document.getElementById('death-lvl-from'),
    deathLvlTo: document.getElementById('death-lvl-to'),
  };

  // ==================== DIALOG LIGHT-DISMISS FALLBACK (Safari) ====================
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const isOutside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => {
        pressedOutside = isOutside(e, dialog);
      });
      dialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && isOutside(e, dialog)) dialog.close();
      });
    }
  }

  document.querySelectorAll('[data-close-dialog]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dlg = btn.closest('dialog');
      if (dlg && dlg.open) dlg.close();
    });
  });

  // ==================== VIEW MANAGEMENT ====================
  function showView(viewId) {
    el.viewMain.hidden = viewId !== 'main';
    el.viewHabitForm.hidden = viewId !== 'habit-form';
    el.viewTaskForm.hidden = viewId !== 'task-form';
    el.viewDeath.hidden = viewId !== 'death';

    if (viewId === 'habit-form') {
      document.getElementById('habit-form-heading').focus();
    } else if (viewId === 'task-form') {
      document.getElementById('task-form-heading').focus();
    }
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    state.filterMode = 0;
    saveState();
    renderAll();
  }

  // ==================== COMBAT & PROGRESSION LOGIC ====================
  function getActiveMonster() {
    return state.monsters.find((m) => m.hp > 0) || null;
  }

  function unlockRandomItem() {
    const locked = COSMETIC_ITEMS.filter((i) => !state.hero.unlockedItems.includes(i.id));
    const pool = locked.length > 0 ? locked : COSMETIC_ITEMS;
    const reward = pool[Math.floor(Math.random() * pool.length)];
    if (!state.hero.unlockedItems.includes(reward.id)) {
      state.hero.unlockedItems.push(reward.id);
    }
    return reward;
  }

  function triggerAttackMotion(who) {
    const target = who === 'hero'
      ? el.heroBtn
      : el.monstersRow.querySelector('.unit-monster');
    if (!target) return;
    target.classList.remove('is-attacking');
    void target.offsetWidth;
    target.classList.add('is-attacking');
    setTimeout(() => target.classList.remove('is-attacking'), 200);
  }

  function applyPositiveAction(effortName) {
    const cfg = EFFORT_CONFIG[effortName] || EFFORT_CONFIG['Médio'];
    const target = getActiveMonster();
    let feedbackText = '+XP';

    if (target) {
      target.hp = Math.max(0, target.hp - cfg.damage);
      if (target.hp === 0) {
        const shortName = target.name.split(' ')[0];
        state.monsters.shift();
        if (state.monsters.length === 0) {
          state.stage += 1;
          state.monsters = createStageMonsters(state.stage);
          feedbackText = `Fase ${state.stage} liberada!`;
        } else {
          feedbackText = `${shortName} derrotado · +XP`;
        }
      } else {
        const shortName = target.name.split(' ')[0];
        feedbackText = `Dano no ${shortName} · +XP`;
      }
    }

    state.combatFeedback = { text: feedbackText, isDamage: false };
    state.hero.xp += cfg.xp;

    if (state.hero.xp >= 100) {
      const oldLevel = state.hero.level;
      state.hero.level += 1;
      state.hero.xp = state.hero.xp - 100;
      state.hero.attack = Math.max(state.hero.attack + 1, Math.round(state.hero.attack * 1.05));
      state.hero.hp = state.hero.maxHpCap;
      const reward = unlockRandomItem();
      saveState();
      renderAll();
      triggerAttackMotion('hero');
      openLevelUpDialog(oldLevel, state.hero.level, reward);
      return;
    }

    saveState();
    renderAll();
    triggerAttackMotion('hero');
  }

  function applyNegativeAction(effortName) {
    const cfg = EFFORT_CONFIG[effortName] || EFFORT_CONFIG['Médio'];
    state.hero.hp = Math.max(0, state.hero.hp - cfg.selfDamage);
    state.combatFeedback = { text: 'Você sofreu dano', isDamage: true };

    if (state.hero.hp <= 0) {
      state.pendingDeathFromLevel = state.hero.level;
      saveState();
      renderAll();
      openDeathView();
      return;
    }

    saveState();
    renderAll();
    triggerAttackMotion('monster');
  }

  function pushHabitUndoSnapshot() {
    const snap = {
      stage: state.stage,
      hero: JSON.parse(JSON.stringify(state.hero)),
      monsters: JSON.parse(JSON.stringify(state.monsters)),
      habits: JSON.parse(JSON.stringify(state.habits)),
      combatFeedback: JSON.parse(JSON.stringify(state.combatFeedback)),
    };
    state.habitUndoStack.push(snap);
    if (state.habitUndoStack.length > 20) state.habitUndoStack.shift();
  }

  function undoLastHabitAction() {
    if (state.habitUndoStack.length === 0) return;
    const prev = state.habitUndoStack.pop();
    state.stage = prev.stage;
    state.hero = prev.hero;
    state.monsters = prev.monsters;
    state.habits = prev.habits;
    state.combatFeedback = { text: 'Ação desfeita', isDamage: false };
    saveState();
    renderAll();
  }

  function openDeathView() {
    const fromLvl = state.pendingDeathFromLevel || state.hero.level;
    const toLvl = Math.max(1, fromLvl - 1);
    el.deathStageLabel.textContent = `FASE DA DERROTA: ${state.stage}`;
    el.deathLvlFrom.textContent = `Level ${fromLvl}`;
    el.deathLvlTo.textContent = `Level ${toLvl}`;
    showView('death');
  }

  // ==================== RENDERING ====================
  function renderArena() {
    el.stagePill.textContent = `FASE ${state.stage}`;
    const stageColor = STAGE_COLORS[(state.stage - 1) % STAGE_COLORS.length];
    const battleScene = document.querySelector('.battle-scene');
    if (battleScene) {
      battleScene.style.backgroundColor = stageColor;
    }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', stageColor);
    }

    if (state.combatFeedback && state.combatFeedback.text) {
      el.combatFeedback.textContent = state.combatFeedback.text;
      el.combatFeedback.classList.toggle('is-damage', Boolean(state.combatFeedback.isDamage));
      el.combatFeedback.hidden = false;
    } else {
      el.combatFeedback.hidden = true;
    }

    const hpPct = Math.max(0, Math.min(100, Math.round(state.hero.hp)));
    el.heroHpFill.style.width = `${hpPct}%`;
    el.heroHpFill.className = `hp-bar-fill ${hpPct <= 40 ? 'hp-red' : 'hp-green'}`;
    el.heroArenaSprite.innerHTML = getHeroSvg('#161616', 44, 52, state.hero.equippedItem);

    el.monstersRow.innerHTML = '';
    const dims = {
      goblin:  { w: 40, h: 48 },
      mini:    { w: 32, h: 38 },
      tronco:  { w: 34, h: 42 },
      morcego: { w: 34, h: 34 },
    };

    state.monsters.forEach((m) => {
      const d = dims[m.kind] || { w: 36, h: 42 };
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `unit-btn unit-monster${m.hp <= 0 ? ' is-defeated' : ''}`;
      btn.setAttribute('aria-label', `Ver detalhes de ${m.name}`);

      const track = document.createElement('div');
      track.className = 'hp-bar-track';
      track.setAttribute('aria-hidden', 'true');
      const fill = document.createElement('div');
      fill.className = 'hp-bar-fill hp-red';
      fill.style.width = `${Math.max(0, Math.min(100, m.hp))}%`;
      track.appendChild(fill);

      const sprite = document.createElement('div');
      sprite.className = 'unit-sprite';
      sprite.innerHTML = getMonsterSvg(m.kind, '#161616', d.w, d.h);

      btn.append(track, sprite);
      btn.addEventListener('click', () => openMonsterDialog(m.id));
      el.monstersRow.appendChild(btn);
    });

    // Status strip
    el.levelLabel.textContent = `Level ${state.hero.level}`;
    const xpPct = Math.max(0, Math.min(100, Math.round(state.hero.xp)));
    el.xpPctLabel.textContent = `${xpPct}%`;
    el.xpBarFill.style.width = `${xpPct}%`;

    const todayTasks = state.tasks.filter((t) => !t.overdue);
    const doneToday = todayTasks.filter((t) => t.done).length;
    const totalToday = todayTasks.length;
    el.todayTasksCount.textContent = `${doneToday}/${totalToday}`;
    const todayPct = totalToday > 0 ? Math.round((doneToday / totalToday) * 100) : 0;
    el.todayTasksFill.style.width = `${todayPct}%`;
  }

  function renderHabits() {
    el.habitsList.innerHTML = '';
    let list = [...state.habits];

    if (state.filterMode === 1) {
      list = list.filter((h) => h.good > h.bad);
    } else if (state.filterMode === 2) {
      list = list.filter((h) => h.bad > h.good);
    }

    if (state.sortMode === 1) {
      list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    }

    if (list.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Nenhum hábito neste filtro. Toque em "Adicionar" para criar um novo.';
      el.habitsList.appendChild(empty);
      return;
    }

    list.forEach((h) => {
      const card = document.createElement('article');
      card.className = 'habit-card';

      const mood = document.createElement('div');
      let moodClass = 'habit-mood-bar';
      if (h.bad > h.good) moodClass += ' is-negative';
      else if (h.good > h.bad) moodClass += ' is-positive';
      mood.className = moodClass;

      const info = document.createElement('div');
      info.className = 'habit-info';
      const title = document.createElement('h2');
      title.className = 'habit-title';
      title.textContent = h.title;
      info.appendChild(title);
      if (h.desc) {
        const desc = document.createElement('p');
        desc.className = 'habit-desc';
        desc.textContent = h.desc;
        info.appendChild(desc);
      }

      const actions = document.createElement('div');
      actions.className = 'habit-actions';

      const btnGood = document.createElement('button');
      btnGood.type = 'button';
      btnGood.className = 'habit-action-btn btn-good';
      btnGood.setAttribute('aria-label', `Cumpri ${h.title}`);
      const gCount = document.createElement('span');
      gCount.className = 'habit-action-count';
      gCount.textContent = `✓ ${h.good}`;
      const gLbl = document.createElement('span');
      gLbl.className = 'habit-action-label';
      gLbl.textContent = 'Cumpri';
      btnGood.append(gCount, gLbl);
      btnGood.addEventListener('click', () => {
        pushHabitUndoSnapshot();
        h.good += 1;
        applyPositiveAction(h.effort);
      });

      const btnBad = document.createElement('button');
      btnBad.type = 'button';
      btnBad.className = 'habit-action-btn btn-bad';
      btnBad.setAttribute('aria-label', `Falhei em ${h.title}`);
      const bCount = document.createElement('span');
      bCount.className = 'habit-action-count';
      bCount.textContent = `✕ ${h.bad}`;
      const bLbl = document.createElement('span');
      bLbl.className = 'habit-action-label';
      bLbl.textContent = 'Falhei';
      btnBad.append(bCount, bLbl);
      btnBad.addEventListener('click', () => {
        pushHabitUndoSnapshot();
        h.bad += 1;
        applyNegativeAction(h.effort);
      });

      actions.append(btnGood, btnBad);
      card.append(mood, info, actions);
      el.habitsList.appendChild(card);
    });
  }

  function createTaskCard(task) {
    const card = document.createElement('article');
    card.className = `task-card${task.done ? ' is-done' : ''}${task.overdue && !task.done ? ' is-overdue' : ''}`;

    const mainRow = document.createElement('div');
    mainRow.className = 'task-card-main';

    if (task.done) {
      const undoBtn = document.createElement('button');
      undoBtn.type = 'button';
      undoBtn.className = 'task-undo-in-card';
      undoBtn.setAttribute('aria-label', `Desfazer conclusão de ${task.title}`);
      const uIcon = document.createElement('span');
      uIcon.className = 'task-undo-icon';
      uIcon.setAttribute('aria-hidden', 'true');
      uIcon.textContent = '↺';
      const uText = document.createElement('span');
      uText.className = 'task-undo-text';
      uText.textContent = 'Desfazer';
      undoBtn.append(uIcon, uText);
      undoBtn.addEventListener('click', () => {
        task.done = false;
        if (task.lastActionSnapshot) {
          state.stage = task.lastActionSnapshot.stage;
          state.hero = task.lastActionSnapshot.hero;
          state.monsters = task.lastActionSnapshot.monsters;
          task.lastActionSnapshot = null;
          state.combatFeedback = { text: 'Conclusão desfeita', isDamage: false };
        }
        saveState();
        renderAll();
      });
      mainRow.appendChild(undoBtn);
    } else {
      const checkBtn = document.createElement('button');
      checkBtn.type = 'button';
      checkBtn.className = 'task-check-hitbox';
      checkBtn.setAttribute('aria-label', `Concluir tarefa ${task.title}`);
      const circle = document.createElement('span');
      circle.className = 'task-check-circle';
      circle.setAttribute('aria-hidden', 'true');
      checkBtn.appendChild(circle);
      checkBtn.addEventListener('click', () => {
        task.lastActionSnapshot = {
          stage: state.stage,
          hero: JSON.parse(JSON.stringify(state.hero)),
          monsters: JSON.parse(JSON.stringify(state.monsters)),
        };
        task.done = true;
        applyPositiveAction(task.effort);
      });
      mainRow.appendChild(checkBtn);
    }

    const info = document.createElement('div');
    info.className = 'task-info';

    const meta = document.createElement('span');
    meta.className = 'task-meta';
    if (task.done) {
      meta.textContent = `${task.dateLabel} · Concluída`;
    } else if (task.repeat && task.repeat !== 'Nenhuma') {
      meta.textContent = `${task.dateLabel} · ${task.repeat}`;
    } else {
      meta.textContent = task.dateLabel;
    }

    const title = document.createElement('h3');
    title.className = 'task-title';
    title.textContent = task.title;
    info.append(meta, title);

    if (task.desc && !task.done) {
      const desc = document.createElement('p');
      desc.className = 'task-desc';
      desc.textContent = task.desc;
      info.appendChild(desc);
    }

    mainRow.appendChild(info);

    if (task.checklist && task.checklist.length > 0) {
      const checkedCount = task.checklist.filter((c) => c.checked).length;
      const badge = document.createElement('button');
      badge.type = 'button';
      badge.className = 'task-checklist-badge';
      badge.setAttribute('aria-expanded', String(Boolean(task.expanded)));
      badge.setAttribute('aria-label', `Checklist: ${checkedCount} de ${task.checklist.length}`);
      badge.textContent = `${checkedCount}/${task.checklist.length}`;
      badge.addEventListener('click', () => {
        task.expanded = !task.expanded;
        saveState();
        renderTasks();
      });
      mainRow.appendChild(badge);
    }

    card.appendChild(mainRow);

    if (task.expanded && task.checklist && task.checklist.length > 0) {
      const drawer = document.createElement('div');
      drawer.className = 'task-checklist-drawer';
      task.checklist.forEach((item) => {
        const subBtn = document.createElement('button');
        subBtn.type = 'button';
        subBtn.className = `task-subitem${item.checked ? ' is-checked' : ''}`;
        const box = document.createElement('span');
        box.className = 'subitem-box';
        box.textContent = item.checked ? '✓' : '';
        const txt = document.createElement('span');
        txt.textContent = item.text;
        subBtn.append(box, txt);
        subBtn.addEventListener('click', () => {
          item.checked = !item.checked;
          saveState();
          renderTasks();
        });
        drawer.appendChild(subBtn);
      });
      card.appendChild(drawer);
    }

    return card;
  }

  function renderTasks() {
    el.tasksSections.innerHTML = '';
    let tasks = [...state.tasks];
    if (state.sortMode === 1) {
      tasks.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    }

    const hoje = tasks.filter((t) => !t.done && !t.overdue);
    const concluidas = tasks.filter((t) => t.done);
    const atrasadas = tasks.filter((t) => !t.done && t.overdue);

    const groups = [
      { key: 'hoje', title: 'Hoje', items: hoje, isDone: false, show: state.filterMode === 0 || state.filterMode === 1 },
      { key: 'concluida', title: 'Concluídas', items: concluidas, isDone: true, show: state.filterMode === 0 || state.filterMode === 1 },
      { key: 'atrasado', title: 'Atrasadas', items: atrasadas, isDone: false, show: state.filterMode === 0 || state.filterMode === 2 },
    ];

    let renderedAny = false;
    groups.forEach((g) => {
      if (!g.show || g.items.length === 0) return;
      renderedAny = true;
      const sec = document.createElement('div');
      sec.className = 'task-group';
      const h = document.createElement('h2');
      h.className = `task-group-title${g.isDone ? ' is-done' : ''}`;
      h.textContent = g.title;
      sec.appendChild(h);
      g.items.forEach((t) => sec.appendChild(createTaskCard(t)));
      el.tasksSections.appendChild(sec);
    });

    if (!renderedAny) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Nenhuma tarefa aqui. Toque em "Adicionar" para criar uma nova tarefa.';
      el.tasksSections.appendChild(empty);
    }
  }

  function renderNavigationAndControls() {
    el.navItems.forEach((btn) => {
      const key = btn.dataset.nav;
      const active = key === state.activeTab;
      btn.classList.toggle('is-active', active);
      if (active) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });

    const isHabito = state.activeTab === 'habito';
    const isTarefa = state.activeTab === 'tarefa';

    el.tabHabito.hidden = !isHabito;
    el.tabTarefa.hidden = !isTarefa;
    el.tabPlaceholder.hidden = isHabito || isTarefa;

    if (isHabito) {
      el.tabSubtitle.textContent = 'Atividades recorrentes - marque quando cumprir ou falhar';
      el.tabSubtitle.hidden = false;
      el.btnUndoHabit.hidden = false;
      el.btnUndoHabit.disabled = state.habitUndoStack.length === 0;
      el.btnFabAdd.hidden = false;
      el.fabAddLabel.textContent = 'Adicionar';
      const filterNames = ['Todos', 'Positivos', 'Negativos'];
      el.filterLabel.textContent = filterNames[state.filterMode] || 'Todos';
    } else if (isTarefa) {
      el.tabSubtitle.textContent = 'Compromissos pontuais ou com prazo - conclua para atacar';
      el.tabSubtitle.hidden = false;
      el.btnUndoHabit.hidden = true;
      el.btnFabAdd.hidden = false;
      el.fabAddLabel.textContent = 'Adicionar';
      const filterNames = ['Todos', 'Hoje', 'Atrasadas'];
      el.filterLabel.textContent = filterNames[state.filterMode] || 'Todos';
    } else {
      el.placeholderTitle.textContent = state.activeTab === 'semanal' ? 'Visão Semanal' : 'Desafios';
      el.tabSubtitle.hidden = true;
      el.btnUndoHabit.hidden = true;
      el.btnFabAdd.hidden = true;
    }

    el.sortLabel.textContent = state.sortMode === 1 ? 'A-Z' : 'Reordenar';
  }

  function renderAll() {
    renderArena();
    renderNavigationAndControls();
    if (state.activeTab === 'habito') renderHabits();
    if (state.activeTab === 'tarefa') renderTasks();
  }

  // ==================== POPUPS (Telas 4, 6, 8, 9, 10, 11) ====================
  function renderCategoryList(container, categories, onSelectPreset) {
    container.innerHTML = '';
    categories.forEach((cat) => {
      const acc = document.createElement('div');
      acc.className = 'category-accordion';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'category-trigger';
      trigger.setAttribute('aria-expanded', 'false');

      const left = document.createElement('span');
      left.className = 'category-left';
      const dot = document.createElement('span');
      dot.className = 'category-dot';
      dot.style.background = cat.color;
      const name = document.createElement('span');
      name.className = 'category-name';
      name.textContent = cat.name;
      left.append(dot, name);

      const chev = document.createElement('span');
      chev.className = 'category-chevron';
      chev.setAttribute('aria-hidden', 'true');
      chev.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

      trigger.append(left, chev);

      const presetsBox = document.createElement('div');
      presetsBox.className = 'category-presets';
      presetsBox.hidden = true;

      cat.presets.forEach((preset) => {
        const pBtn = document.createElement('button');
        pBtn.type = 'button';
        pBtn.className = 'preset-btn';
        const pLeft = document.createElement('span');
        pLeft.className = 'preset-left';
        const pEmoji = document.createElement('span');
        pEmoji.className = 'preset-emoji';
        pEmoji.setAttribute('aria-hidden', 'true');
        pEmoji.textContent = preset.emoji || '';
        const pTitle = document.createElement('span');
        pTitle.textContent = preset.title;
        pLeft.append(pEmoji, pTitle);

        const pArrow = document.createElement('span');
        pArrow.className = 'preset-arrow';
        pArrow.setAttribute('aria-hidden', 'true');
        pArrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        pBtn.append(pLeft, pArrow);
        pBtn.addEventListener('click', () => onSelectPreset(preset));
        presetsBox.appendChild(pBtn);
      });

      trigger.addEventListener('click', () => {
        const willOpen = presetsBox.hidden;
        container.querySelectorAll('.category-accordion').forEach((other) => {
          other.classList.remove('is-open');
          const b = other.querySelector('.category-trigger');
          const p = other.querySelector('.category-presets');
          if (b) b.setAttribute('aria-expanded', 'false');
          if (p) p.hidden = true;
        });
        if (willOpen) {
          acc.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          presetsBox.hidden = false;
        }
      });

      acc.append(trigger, presetsBox);
      container.appendChild(acc);
    });
  }

  function openHabitForm(preset = null) {
    if (el.dialogHabitCat.open) el.dialogHabitCat.close();
    el.formNewHabit.reset();
    el.habitTitleErr.textContent = '';
    el.habitTitle.removeAttribute('aria-invalid');
    if (preset) {
      el.habitTitle.value = preset.emoji ? `${preset.emoji} ${preset.title}` : (preset.title || '');
      el.habitDesc.value = preset.desc || '';
      const radio = el.formNewHabit.querySelector(`input[name="effort"][value="${preset.effort}"]`);
      if (radio) radio.checked = true;
    }
    showView('habit-form');
  }

  function formatDateBR(isoDate) {
    if (!isoDate) return 'Sem prazo';
    const [y, m, d] = isoDate.split('-');
    if (!y || !m || !d) return isoDate;
    return `${d}/${m}/${y}`;
  }

  function formatDateShort(dateText) {
    if (!dateText || dateText.includes('_')) return 'Sem prazo';
    const parts = dateText.split('/');
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return dateText;
  }

  function renderChecklistEditor() {
    el.checklistEditor.innerHTML = '';
    taskFormChecklist.forEach((itemText, idx) => {
      const row = document.createElement('div');
      row.className = 'checklist-row';

      const txt = document.createElement('span');
      txt.className = 'checklist-row-text';
      txt.textContent = itemText;

      const ctrls = document.createElement('div');
      ctrls.className = 'checklist-row-controls';

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'checklist-del-btn';
      delBtn.setAttribute('aria-label', `Remover ${itemText}`);
      delBtn.textContent = '×';
      delBtn.addEventListener('click', () => {
        taskFormChecklist.splice(idx, 1);
        renderChecklistEditor();
      });

      const sep = document.createElement('span');
      sep.className = 'checklist-drag-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '|';

      const handle = document.createElement('span');
      handle.className = 'checklist-drag-icon';
      handle.setAttribute('aria-hidden', 'true');
      handle.textContent = '=';

      ctrls.append(delBtn, sep, handle);
      row.append(txt, ctrls);
      el.checklistEditor.appendChild(row);
    });
  }

  function openTaskForm(preset = null) {
    if (el.dialogTaskCat.open) el.dialogTaskCat.close();
    el.formNewTask.reset();
    el.taskTitleErr.textContent = '';
    el.taskTitle.removeAttribute('aria-invalid');
    el.taskDate.value = '';
    el.taskDateText.value = '__/__/2026';
    el.taskDateEmptyBtn.hidden = false;
    el.taskDateActiveWrap.hidden = true;
    el.checklistNewInput.value = '';
    el.btnAddChecklist.hidden = true;
    taskFormChecklist = preset ? [...(preset.checklist || [])] : ['item 1'];

    if (preset) {
      el.taskTitle.value = preset.emoji ? `${preset.emoji} ${preset.title}` : (preset.title || '');
      el.taskDesc.value = preset.desc || '';
      const radio = el.formNewTask.querySelector(`input[name="taskEffort"][value="${preset.effort}"]`);
      if (radio) radio.checked = true;
    }
    renderChecklistEditor();
    showView('task-form');
  }

  function openMonsterDialog(monsterId) {
    const monster = state.monsters.find((m) => m.id === monsterId);
    if (!monster) return;
    el.monsterDialogHpFill.style.width = `${Math.max(0, Math.min(100, monster.hp))}%`;
    el.monsterDialogSprite.innerHTML = getMonsterSvg(monster.kind, '#FFFFFF', 68, 78);
    el.monsterDialogName.textContent = monster.name;
    el.monsterDialogDrops.innerHTML = '';
    monster.drops.forEach((drop) => {
      const sw = document.createElement('span');
      sw.className = 'drop-swatch';
      sw.innerHTML = getItemSvg(drop.type, drop.color, 24);
      sw.title = drop.label;
      el.monsterDialogDrops.appendChild(sw);
    });
    el.dialogMonster.showModal();
  }

  function openHeroDialog() {
    const hpPct = Math.max(0, Math.min(100, Math.round(state.hero.hp)));
    el.heroDialogHpFill.style.width = `${hpPct}%`;
    el.heroDialogHpFill.className = `hp-bar-fill ${hpPct <= 40 ? 'hp-red' : 'hp-green'}`;
    el.heroDialogSprite.innerHTML = getHeroSvg('#FFFFFF', 68, 78, state.hero.equippedItem);
    el.heroDialogLevel.textContent = `Level ${state.hero.level}`;
    el.heroDialogAtk.textContent = `ATAQUE: ${state.hero.attack}`;
    el.heroDialogHp.textContent = `VIDA: ${hpPct}%`;
    el.dialogHero.showModal();
  }

  function openLevelUpDialog(fromLevel, toLevel, reward) {
    el.levelupSprite.innerHTML = getHeroSvg('#FFFFFF', 64, 74, state.hero.equippedItem);
    el.levelupFrom.textContent = `Level ${fromLevel}`;
    el.levelupTo.textContent = `Level ${toLevel}`;
    el.levelupItemSwatch.innerHTML = getItemSvg(reward.type, reward.color, 28);
    el.levelupItemName.textContent = reward.name;
    el.dialogLevelup.showModal();
  }

  function openCustomizeDialog() {
    if (el.dialogHero.open) el.dialogHero.close();
    if (el.dialogLevelup.open) el.dialogLevelup.close();
    if (el.dialogMenu.open) el.dialogMenu.close();
    renderCustomizeModal();
    el.dialogCustomize.showModal();
  }

  function renderCustomizeModal() {
    const stageColor = STAGE_COLORS[(state.stage - 1) % STAGE_COLORS.length];
    const previewBox = document.querySelector('.customize-preview');
    if (previewBox) previewBox.style.backgroundColor = stageColor;
    const equipped = COSMETIC_ITEMS.find((i) => i.id === state.hero.equippedItem);
    el.customizeHeroSprite.innerHTML = getHeroSvg('#161616', 70, 80, state.hero.equippedItem);
    el.customizeEquippedLabel.textContent = equipped ? `Equipado: ${equipped.name}` : 'Visual padrão';

    el.customizeItemsList.innerHTML = '';

    // Default option
    const defBtn = document.createElement('button');
    defBtn.type = 'button';
    defBtn.className = `custom-item-btn${!state.hero.equippedItem ? ' is-equipped' : ''}`;
    defBtn.innerHTML = `
      <span class="custom-item-left">
        <span class="drop-swatch">${getItemSvg('default', '#A6A6A6', 24)}</span>
        <span class="custom-item-name">Visual Padrão</span>
      </span>
      <span class="custom-item-status">${!state.hero.equippedItem ? 'Equipado' : 'Usar'}</span>
    `;
    defBtn.addEventListener('click', () => {
      state.hero.equippedItem = null;
      saveState();
      renderArena();
      renderCustomizeModal();
    });
    el.customizeItemsList.appendChild(defBtn);

    COSMETIC_ITEMS.forEach((item) => {
      const unlocked = state.hero.unlockedItems.includes(item.id);
      const isEq = state.hero.equippedItem === item.id;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `custom-item-btn${isEq ? ' is-equipped' : ''}`;
      btn.disabled = !unlocked;

      const left = document.createElement('span');
      left.className = 'custom-item-left';
      const sw = document.createElement('span');
      sw.className = 'drop-swatch';
      sw.innerHTML = getItemSvg(item.type, item.color, 24);
      const nm = document.createElement('span');
      nm.className = 'custom-item-name';
      nm.textContent = item.name;
      left.append(sw, nm);

      const st = document.createElement('span');
      st.className = 'custom-item-status';
      st.textContent = isEq ? 'Equipado' : (unlocked ? 'Disponível' : 'Bloqueado');

      btn.append(left, st);
      btn.addEventListener('click', () => {
        if (!unlocked) return;
        state.hero.equippedItem = item.id;
        saveState();
        renderArena();
        renderCustomizeModal();
      });
      el.customizeItemsList.appendChild(btn);
    });
  }

  // ==================== EVENT LISTENERS ====================
  el.heroBtn.addEventListener('click', openHeroDialog);
  el.btnUndoHabit.addEventListener('click', undoLastHabitAction);

  el.btnFabAdd.addEventListener('click', () => {
    if (state.activeTab === 'tarefa') {
      renderCategoryList(el.taskCategoriesList, TASK_CATEGORIES, (preset) => openTaskForm(preset));
      el.dialogTaskCat.showModal();
    } else {
      renderCategoryList(el.habitCategoriesList, HABIT_CATEGORIES, (preset) => openHabitForm(preset));
      el.dialogHabitCat.showModal();
    }
  });

  document.getElementById('btn-habit-custom').addEventListener('click', () => openHabitForm(null));
  document.getElementById('btn-task-custom').addEventListener('click', () => openTaskForm(null));

  document.getElementById('btn-habit-back').addEventListener('click', () => showView('main'));
  document.getElementById('btn-task-back').addEventListener('click', () => {
    showView('main');
    renderCategoryList(el.taskCategoriesList, TASK_CATEGORIES, (preset) => openTaskForm(preset));
    el.dialogTaskCat.showModal();
  });

  el.navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;
      if (target === 'menu') {
        el.dialogMenu.showModal();
        return;
      }
      setActiveTab(target);
    });
  });

  document.getElementById('btn-back-to-habits').addEventListener('click', () => setActiveTab('habito'));

  document.getElementById('btn-sort').addEventListener('click', () => {
    state.sortMode = (state.sortMode + 1) % 2;
    saveState();
    renderAll();
  });

  document.getElementById('btn-filter').addEventListener('click', () => {
    state.filterMode = (state.filterMode + 1) % 3;
    saveState();
    renderAll();
  });

  // Form validation & submission - Habit (Tela 5)
  el.habitTitle.addEventListener('input', () => {
    if (el.habitTitle.value.trim()) {
      el.habitTitleErr.textContent = '';
      el.habitTitle.removeAttribute('aria-invalid');
    }
  });

  el.formNewHabit.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = el.habitTitle.value.trim();
    if (!title) {
      el.habitTitleErr.textContent = 'Digite um título para o hábito.';
      el.habitTitle.setAttribute('aria-invalid', 'true');
      el.habitTitle.focus();
      return;
    }

    const effort = el.formNewHabit.querySelector('input[name="effort"]:checked')?.value || 'Médio';
    const resetFreq = el.formNewHabit.querySelector('input[name="resetFreq"]:checked')?.value || 'Diariamente';

    state.habits.unshift({
      id: `h-${Date.now()}`,
      title,
      desc: el.habitDesc.value.trim(),
      good: 0,
      bad: 0,
      effort,
      resetFreq,
      notify: el.habitNotify.checked,
    });

    state.activeTab = 'habito';
    state.combatFeedback = { text: 'Hábito criado!', isDamage: false };
    saveState();
    showView('main');
    renderAll();
  });

  // Form validation & submission - Task (Tela 7)
  el.taskTitle.addEventListener('input', () => {
    if (el.taskTitle.value.trim()) {
      el.taskTitleErr.textContent = '';
      el.taskTitle.removeAttribute('aria-invalid');
    }
  });

  el.taskDateEmptyBtn.addEventListener('click', () => {
    el.taskDateEmptyBtn.hidden = true;
    el.taskDateActiveWrap.hidden = false;
    el.taskDateText.value = '__/__/2026';
    el.taskDateText.focus();
    el.taskDateText.setSelectionRange(0, 0);
  });

  el.taskDateClearBtn.addEventListener('click', () => {
    el.taskDate.value = '';
    el.taskDateText.value = '__/__/2026';
    el.taskDateActiveWrap.hidden = true;
    el.taskDateEmptyBtn.hidden = false;
  });

  el.taskDate.addEventListener('change', () => {
    if (el.taskDate.value) {
      el.taskDateEmptyBtn.hidden = true;
      el.taskDateActiveWrap.hidden = false;
      el.taskDateText.value = formatDateBR(el.taskDate.value);
    }
  });

  el.taskDateText.addEventListener('input', (e) => {
    if (e.inputType && e.inputType.startsWith('delete')) return;
    const raw = el.taskDateText.value;
    const digits = raw.replace(/\D/g, '').slice(0, 8);
    if (digits.length === 0) {
      el.taskDateText.value = '__/__/2026';
      el.taskDateText.setSelectionRange(0, 0);
      return;
    }
    if (raw.includes('_')) {
      const cleanDigits = raw.replace(/_/g, '').replace(/\D/g, '').slice(0, 8);
      const dm = cleanDigits.slice(0, 4);
      const year = cleanDigits.length > 4 ? cleanDigits.slice(4, 8).padEnd(4, '_') : '2026';
      const d = dm.slice(0, 2).padEnd(2, '_');
      const m = dm.slice(2, 4).padEnd(2, '_');
      el.taskDateText.value = `${d}/${m}/${year}`;
      const nextPos = el.taskDateText.value.indexOf('_');
      if (nextPos !== -1) el.taskDateText.setSelectionRange(nextPos, nextPos);
    } else {
      const d = digits.slice(0, 2);
      const m = digits.slice(2, 4);
      const y = digits.slice(4, 8);
      el.taskDateText.value = [d, m, y].filter(Boolean).join('/');
    }
  });

  el.checklistNewInput.addEventListener('input', () => {
    el.btnAddChecklist.hidden = el.checklistNewInput.value.trim().length === 0;
  });

  function addChecklistItemFromInput() {
    const val = el.checklistNewInput.value.trim();
    if (!val) return;
    taskFormChecklist.push(val);
    el.checklistNewInput.value = '';
    el.btnAddChecklist.hidden = true;
    renderChecklistEditor();
    el.checklistNewInput.focus();
  }

  el.btnAddChecklist.addEventListener('click', addChecklistItemFromInput);
  el.checklistNewInput.addEventListener('keydown', (e) => {
    if (e.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      addChecklistItemFromInput();
    }
  });

  el.formNewTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = el.taskTitle.value.trim();
    if (!title) {
      el.taskTitleErr.textContent = 'Digite um título para a tarefa.';
      el.taskTitle.setAttribute('aria-invalid', 'true');
      el.taskTitle.focus();
      return;
    }

    if (el.checklistNewInput.value.trim()) {
      taskFormChecklist.push(el.checklistNewInput.value.trim());
    }

    const effort = el.formNewTask.querySelector('input[name="taskEffort"]:checked')?.value || 'Difícil';
    const hasCustomDate = !el.taskDateActiveWrap.hidden && !el.taskDateText.value.includes('_');
    const dueDate = el.taskDate.value || (hasCustomDate ? el.taskDateText.value : '');

    state.tasks.unshift({
      id: `t-${Date.now()}`,
      title,
      desc: el.taskDesc.value.trim(),
      dateLabel: hasCustomDate ? formatDateShort(el.taskDateText.value) : 'Sem prazo',
      dueDate,
      repeat: el.taskRepeat.value,
      effort,
      done: false,
      overdue: false,
      expanded: false,
      checklist: taskFormChecklist.map((text) => ({ text, checked: false })),
      lastActionSnapshot: null,
    });

    state.activeTab = 'tarefa';
    state.combatFeedback = { text: 'Tarefa criada!', isDamage: false };
    saveState();
    showView('main');
    renderAll();
  });

  // Customizar Visuais triggers
  document.getElementById('btn-hero-customize').addEventListener('click', openCustomizeDialog);
  document.getElementById('btn-levelup-customize').addEventListener('click', openCustomizeDialog);
  document.getElementById('btn-open-customize-menu').addEventListener('click', openCustomizeDialog);

  // Death retry button (Tela 12)
  document.getElementById('btn-retry-death').addEventListener('click', () => {
    state.hero.level = Math.max(1, state.hero.level - 1);
    state.hero.xp = 0;
    state.hero.maxHpCap = Math.max(40, state.hero.maxHpCap - 20);
    state.hero.hp = state.hero.maxHpCap;
    // Perde os itens mas mantém a força conquistada
    state.hero.equippedItem = null;
    state.hero.unlockedItems = [];
    state.combatFeedback = { text: 'Força mantida · Nova tentativa!', isDamage: false };
    state.activeTab = 'habito';
    saveState();
    showView('main');
    renderAll();
  });

  // Menu actions
  document.getElementById('btn-toggle-fullscreen').addEventListener('click', async () => {
    if (el.dialogMenu.open) el.dialogMenu.close();
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen unavailable on iOS Safari without PWA standalone install
    }
  });

  document.getElementById('btn-reset-prototype').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    state = createDefaultState();
    if (el.dialogMenu.open) el.dialogMenu.close();
    showView('main');
    renderAll();
  });

  // Register Service Worker for PWA installability
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  // Initial render
  if (state.hero.hp <= 0) {
    openDeathView();
  } else {
    showView('main');
    renderAll();
  }
})();
