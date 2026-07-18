/**
 * SERVICE: GestaoDeParceirasService — casos de uso da Gestão de Parceiras
 * (SPEC-002 UC-002.01 · Ativar/Inativar vínculo, UC-002.02 · Editar
 * Condição Comercial).
 *
 * UC-002.01: reidrata a Parceira (Domínio) a partir do estado persistido
 * — nasce Inativa (RN-01) e replica a transição só se o estado atual for
 * Ativa, atravessando o próprio Domínio (mesmo padrão de reidratação de
 * EnvioACL.reidratar) — e delega a transição real a `Parceira.ativar()`/
 * `.inativar()`, que já recusa transição repetida (GP-02). RN-11/INV-02: a
 * inativação NUNCA exclui a linha — só troca a célula STATUS
 * (ParceiraACL.atualizarEstado).
 *
 * UC-002.02: grava somente os campos de Condição Comercial informados
 * (mesma granularidade parcial de PerfilPortalService.editarPerfil). CB-02
 * (SPEC-005 RN-06): a Condição Comercial em si não é versionada por
 * competência — quem já congela por competência é o Snapshot
 * (CondicaoComercialSnapshot, imutável); esta edição não toca nenhuma
 * Colaboração Mensal já compilada, então nunca retroage.
 *
 * GP-03 (operação não autorizada, §17): NÃO APLICÁVEL hoje — dívida
 * registrada. Diferente do Portal da Parceira (SPEC-025/027/032), esta é
 * uma operação administrativa da equipe (§13 do PRD: Administrador/
 * Operador), sem Sessão/token; o sistema ainda não tem um mecanismo de
 * autenticação de equipe implementado (mesma dívida documentada como DC-03
 * em DocumentoService/BriefingService). Quando esse mecanismo existir, a
 * verificação de papel entra aqui, sem mudar o restante do fluxo.
 *
 * Não pode: tocar SpreadsheetApp; conhecer coluna física; formatar envelope.
 *
 * @param {ParceiraACL} parceiraACL portas da Gestão de Parceiras (SPEC-002
 *   §14.1: obterEstado/atualizarEstado/obterCondicaoComercial/
 *   atualizarCondicaoComercial).
 */

this.GestaoDeParceirasService = class GestaoDeParceirasService {
  constructor(parceiraACL) {
    this.parceiraACL = parceiraACL;
  }

  /**
   * @param {{parceiraId: string}} comando
   * @returns {string} parceiraId validado.
   * @throws {Error} GP-01 Parceira não informada (§17).
   */
  parceiraIdDe(comando) {
    if (
      comando == null ||
      typeof comando !== 'object' ||
      !comando.parceiraId ||
      !String(comando.parceiraId).trim()
    ) {
      throw new Error('GP-01: Parceira não informada (§17).');
    }
    return String(comando.parceiraId).trim();
  }

  /**
   * Reidrata a Parceira a partir do estado persistido, atravessando o
   * Domínio: nasce Inativa (RN-01) e só replica `.ativar()` se o estado
   * atual já for Ativa.
   * @param {string} parceiraId
   * @returns {Parceira}
   * @throws {Error} GP-01 Parceira inexistente (§17).
   */
  reidratar(parceiraId) {
    const estado = this.parceiraACL.obterEstado(parceiraId);
    if (estado === null) {
      throw new Error("GP-01: Parceira '" + parceiraId + "' inexistente (§17).");
    }
    const parceira = new Parceira(parceiraId);
    if (estado === 'Ativa') {
      parceira.ativar();
    }
    return parceira;
  }

  /**
   * UC-002.01 · Ativar o vínculo (Inativa → Ativa).
   * @param {{parceiraId: string}} comando
   * @returns {{parceiraId: string, estado: 'Ativa'}}
   * @throws {Error} GP-01 Parceira inexistente; GP-02 já está Ativa (§17).
   */
  ativar(comando) {
    const parceiraId = this.parceiraIdDe(comando);
    const parceira = this.reidratar(parceiraId);
    parceira.ativar();
    this.parceiraACL.atualizarEstado(parceiraId, parceira.estado);
    return { parceiraId: parceiraId, estado: parceira.estado };
  }

  /**
   * UC-002.01 · Inativar o vínculo (Ativa → Inativa). RN-11/INV-02: a
   * inativação preserva o registro cadastral/contratual — ParceiraACL só
   * troca a célula STATUS, nunca exclui a linha.
   * @param {{parceiraId: string}} comando
   * @returns {{parceiraId: string, estado: 'Inativa'}}
   * @throws {Error} GP-01 Parceira inexistente; GP-02 já está Inativa (§17).
   */
  inativar(comando) {
    const parceiraId = this.parceiraIdDe(comando);
    const parceira = this.reidratar(parceiraId);
    parceira.inativar();
    this.parceiraACL.atualizarEstado(parceiraId, parceira.estado);
    return { parceiraId: parceiraId, estado: parceira.estado };
  }

  /**
   * UC-002.02 · Editar Condição Comercial (valor, entregáveis, prazo e
   * canais de uso de imagem) — só os campos informados são gravados
   * (mesma granularidade parcial de PerfilPortalService.editarPerfil).
   * @param {{parceiraId: string, valorMensal: (string|undefined),
   *   reels: (string|undefined), carrossel: (string|undefined),
   *   stories: (string|undefined), looks: (string|undefined),
   *   prazoUsoImagem: (string|undefined),
   *   canaisUsoImagem: (string|undefined)}} comando
   * @returns {{parceiraId: string, valorMensal: string, reels: string,
   *   carrossel: string, stories: string, looks: string,
   *   prazoUsoImagem: string, canaisUsoImagem: string}} a Condição
   *   Comercial resultante (atual + campos recém-gravados).
   * @throws {Error} GP-01 Parceira inexistente (§17).
   */
  editarCondicaoComercial(comando) {
    const parceiraId = this.parceiraIdDe(comando);
    const atual = this.parceiraACL.obterCondicaoComercial(parceiraId);
    if (atual === null) {
      throw new Error("GP-01: Parceira '" + parceiraId + "' inexistente (§17).");
    }

    const seguro = comando || {};
    const campos = {};
    [
      'valorMensal',
      'reels',
      'carrossel',
      'stories',
      'looks',
      'prazoUsoImagem',
      'canaisUsoImagem',
    ].forEach((campo) => {
      if (seguro[campo] !== undefined) {
        campos[campo] = String(seguro[campo] == null ? '' : seguro[campo]).trim();
      }
    });

    this.parceiraACL.atualizarCondicaoComercial(parceiraId, campos);
    return Object.assign({ parceiraId: parceiraId }, atual, campos);
  }
};
