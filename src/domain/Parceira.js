/**
 * ENTIDADE: Parceira (agregado raiz)
 *
 * Primeira entidade de domínio do TEAR V2. Representa uma parceira do programa
 * de colaboração.
 *
 * Invariantes preservadas:
 * - RN-01 (SPEC-001 §4 / SPEC-002 §9): nasce Inativa; ativação é sempre manual.
 * - INV-01 (SPEC-002 §11): sempre um e apenas um estado de vínculo.
 * - INV-02: inativar preserva a identidade e os dados cadastrais.
 * - GP-02 (SPEC-002 §9/§17): a máquina de estados só tem duas transições
 *   (Inativa→Ativa, Ativa→Inativa); repetir a transição atual (ex.: ativar
 *   quem já está Ativa) é transição inválida — falha barulhento, mesmo
 *   padrão de guarda de máquina de estados do Envio (LG-02).
 *
 * Estados canônicos fechados (ADR-001 §2.1): 'Ativa' | 'Inativa'.
 * A coerção cru↔canônico (ON/OFF) pertence à ACL, nunca a esta entidade.
 *
 * Não pode conhecer: SpreadsheetApp, HTML, HTTP, Repository, ACL.
 */

this.Parceira = class Parceira {
  constructor(nome) {
    if (!nome || !String(nome).trim()) {
      throw new Error('Parceira exige nome (identidade INFLU_KEY).');
    }
    this.nome = nome;
    // RN-01: toda Parceira nasce Inativa; nunca ativada automaticamente.
    this.estado = 'Inativa';
  }

  /**
   * UC-002.01 · Ativação manual do vínculo: Inativa → Ativa.
   * @returns {Parceira}
   * @throws {Error} GP-02 transição inválida se já está Ativa (§17).
   */
  ativar() {
    if (this.estado === 'Ativa') {
      throw new Error(
        "GP-02: transição de estado inválida (§9/§17) — Parceira '" +
          this.nome +
          "' já está Ativa."
      );
    }
    this.estado = 'Ativa';
    return this;
  }

  /**
   * UC-002.01 · Inativação manual do vínculo: Ativa → Inativa. RN-11/INV-02:
   * aqui só transiciona o estado em memória — a preservação do registro
   * cadastral/contratual (nunca excluir a linha) é responsabilidade de quem
   * persiste (ACL/Repository), nunca desta entidade.
   * @returns {Parceira}
   * @throws {Error} GP-02 transição inválida se já está Inativa (§17).
   */
  inativar() {
    if (this.estado === 'Inativa') {
      throw new Error(
        "GP-02: transição de estado inválida (§9/§17) — Parceira '" +
          this.nome +
          "' já está Inativa."
      );
    }
    this.estado = 'Inativa';
    return this;
  }

  estaAtiva() {
    return this.estado === 'Ativa';
  }
};
