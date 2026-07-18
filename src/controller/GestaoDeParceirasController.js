/**
 * CONTROLLER: GestaoDeParceirasController — adapta o contrato externo da
 * Gestão de Parceiras (SPEC-002 UC-002.01/UC-002.02).
 *
 * Recebe a chamada do Entrypoint (google.script.run), invoca o
 * GestaoDeParceirasService e devolve SEMPRE o envelope padrão {success,data}/
 * {success,error} (PROJECT_GOVERNANCE §3.3, via envelopeOk/envelopeFail) —
 * mesmo estilo de catch de ParceiraController (SPEC-001).
 *
 * Não pode: tocar SpreadsheetApp; conter regra de negócio; conhecer coluna
 * física.
 *
 * @param {GestaoDeParceirasService} gestaoDeParceirasService
 */

this.GestaoDeParceirasController = class GestaoDeParceirasController {
  constructor(gestaoDeParceirasService) {
    this.gestaoDeParceirasService = gestaoDeParceirasService;
  }

  /**
   * Adapta o comando Ativar (UC-002.01) ao contrato externo.
   * @param {{parceiraId: string}} dados
   * @returns {{success: true, data: object}|{success: false, error: object}}
   */
  ativar(dados) {
    try {
      return envelopeOk(this.gestaoDeParceirasService.ativar(dados));
    } catch (erro) {
      return envelopeFail({ mensagem: erro.message });
    }
  }

  /**
   * Adapta o comando Inativar (UC-002.01) ao contrato externo.
   * @param {{parceiraId: string}} dados
   * @returns {{success: true, data: object}|{success: false, error: object}}
   */
  inativar(dados) {
    try {
      return envelopeOk(this.gestaoDeParceirasService.inativar(dados));
    } catch (erro) {
      return envelopeFail({ mensagem: erro.message });
    }
  }

  /**
   * Adapta o comando Editar Condição Comercial (UC-002.02) ao contrato externo.
   * @param {{parceiraId: string, valorMensal: (string|undefined),
   *   reels: (string|undefined), carrossel: (string|undefined),
   *   stories: (string|undefined), looks: (string|undefined),
   *   prazoUsoImagem: (string|undefined),
   *   canaisUsoImagem: (string|undefined)}} dados
   * @returns {{success: true, data: object}|{success: false, error: object}}
   */
  editarCondicaoComercial(dados) {
    try {
      return envelopeOk(this.gestaoDeParceirasService.editarCondicaoComercial(dados));
    } catch (erro) {
      return envelopeFail({ mensagem: erro.message });
    }
  }
};
