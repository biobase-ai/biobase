"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChatRequestTokenCount = getChatRequestTokenCount;
exports.getMaxTokenCount = getMaxTokenCount;
exports.getMessageTokenCount = getMessageTokenCount;
exports.tokenizer = void 0;
var _jsTiktoken = require("js-tiktoken");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var tokenizer = exports.tokenizer = (0, _jsTiktoken.getEncoding)('cl100k_base');

/**
 * Count the tokens for multi-message chat completion requests
 */
function getChatRequestTokenCount(messages) {
  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'gpt-4o-mini-2024-07-18';
  var tokensPerRequest = 3; // every reply is primed with <|im_start|>assistant<|im_sep|>
  var numTokens = messages.reduce(function (acc, message) {
    return acc + getMessageTokenCount(message, model);
  }, 0);
  return numTokens + tokensPerRequest;
}

/**
 * Count the tokens for a single message within a chat completion request
 *
 * See "Counting tokens for chat API calls"
 * from https://github.com/openai/openai-cookbook/blob/834181d5739740eb8380096dac7056c925578d9a/examples/How_to_count_tokens_with_tiktoken.ipynb
 */
function getMessageTokenCount(message) {
  var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'gpt-4o-mini-2024-07-18';
  var tokensPerMessage;
  var tokensPerName;
  switch (model) {
    case 'gpt-3.5-turbo':
      console.warn('Warning: gpt-3.5-turbo may change over time. Returning num tokens assuming gpt-3.5-turbo-0301.');
      return getMessageTokenCount(message, 'gpt-3.5-turbo-0301');
    case 'gpt-4':
      console.warn('Warning: gpt-4 may change over time. Returning num tokens assuming gpt-4-0314.');
      return getMessageTokenCount(message, 'gpt-4-0314');
    case 'gpt-3.5-turbo-0301':
      tokensPerMessage = 4; // every message follows <|start|>{role/name}\n{content}<|end|>\n
      tokensPerName = -1; // if there's a name, the role is omitted
      break;
    case 'gpt-4o-mini-2024-07-18':
      tokensPerMessage = 3;
      tokensPerName = 1;
      break;
    case 'gpt-4-0314':
      tokensPerMessage = 3;
      tokensPerName = 1;
      break;
    default:
      throw new Error("Unknown model '".concat(model, "'. See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens."));
  }
  return Object.entries(message).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    acc += tokenizer.encode(value).length;
    if (key === 'name') {
      acc += tokensPerName;
    }
    return acc;
  }, tokensPerMessage);
}

/**
 * Get the maximum number of tokens for a model's context.
 *
 * Includes tokens in both message and completion.
 */
function getMaxTokenCount(model) {
  switch (model) {
    case 'gpt-3.5-turbo':
      console.warn('Warning: gpt-3.5-turbo may change over time. Returning max num tokens assuming gpt-3.5-turbo-0301.');
      return getMaxTokenCount('gpt-3.5-turbo-0301');
    case 'gpt-4':
      console.warn('Warning: gpt-4 may change over time. Returning max num tokens assuming gpt-4-0314.');
      return getMaxTokenCount('gpt-4-0314');
    case 'gpt-3.5-turbo-0301':
      return 4097;
    case 'gpt-4-0314':
      return 4097;
    case 'gpt-4o-mini-2024-07-18':
      return 4097;
    default:
      throw new Error("Unknown model '".concat(model, "'"));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNUaWt0b2tlbiIsInJlcXVpcmUiLCJfc2xpY2VkVG9BcnJheSIsInIiLCJlIiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIlR5cGVFcnJvciIsImEiLCJfYXJyYXlMaWtlVG9BcnJheSIsInQiLCJ0b1N0cmluZyIsImNhbGwiLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJsZW5ndGgiLCJuIiwibCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiaSIsInUiLCJmIiwibyIsIm5leHQiLCJPYmplY3QiLCJkb25lIiwicHVzaCIsInZhbHVlIiwiaXNBcnJheSIsInRva2VuaXplciIsImV4cG9ydHMiLCJnZXRFbmNvZGluZyIsImdldENoYXRSZXF1ZXN0VG9rZW5Db3VudCIsIm1lc3NhZ2VzIiwibW9kZWwiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ0b2tlbnNQZXJSZXF1ZXN0IiwibnVtVG9rZW5zIiwicmVkdWNlIiwiYWNjIiwibWVzc2FnZSIsImdldE1lc3NhZ2VUb2tlbkNvdW50IiwidG9rZW5zUGVyTWVzc2FnZSIsInRva2Vuc1Blck5hbWUiLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwiY29uY2F0IiwiZW50cmllcyIsIl9yZWYiLCJfcmVmMiIsImtleSIsImVuY29kZSIsImdldE1heFRva2VuQ291bnQiXSwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5pemVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEVuY29kaW5nIH0gZnJvbSAnanMtdGlrdG9rZW4nXG5pbXBvcnQgdHlwZSBPcGVuQUkgZnJvbSAnb3BlbmFpJ1xuXG5leHBvcnQgY29uc3QgdG9rZW5pemVyID0gZ2V0RW5jb2RpbmcoJ2NsMTAwa19iYXNlJylcblxuLyoqXG4gKiBDb3VudCB0aGUgdG9rZW5zIGZvciBtdWx0aS1tZXNzYWdlIGNoYXQgY29tcGxldGlvbiByZXF1ZXN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhdFJlcXVlc3RUb2tlbkNvdW50KFxuICBtZXNzYWdlczogT3BlbkFJLkNoYXQuQ29tcGxldGlvbnMuQ2hhdENvbXBsZXRpb25NZXNzYWdlUGFyYW1bXSxcbiAgbW9kZWwgPSAnZ3B0LTRvLW1pbmktMjAyNC0wNy0xOCdcbik6IG51bWJlciB7XG4gIGNvbnN0IHRva2Vuc1BlclJlcXVlc3QgPSAzIC8vIGV2ZXJ5IHJlcGx5IGlzIHByaW1lZCB3aXRoIDx8aW1fc3RhcnR8PmFzc2lzdGFudDx8aW1fc2VwfD5cbiAgY29uc3QgbnVtVG9rZW5zID0gbWVzc2FnZXMucmVkdWNlKChhY2MsIG1lc3NhZ2UpID0+IGFjYyArIGdldE1lc3NhZ2VUb2tlbkNvdW50KG1lc3NhZ2UsIG1vZGVsKSwgMClcblxuICByZXR1cm4gbnVtVG9rZW5zICsgdG9rZW5zUGVyUmVxdWVzdFxufVxuXG4vKipcbiAqIENvdW50IHRoZSB0b2tlbnMgZm9yIGEgc2luZ2xlIG1lc3NhZ2Ugd2l0aGluIGEgY2hhdCBjb21wbGV0aW9uIHJlcXVlc3RcbiAqXG4gKiBTZWUgXCJDb3VudGluZyB0b2tlbnMgZm9yIGNoYXQgQVBJIGNhbGxzXCJcbiAqIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL29wZW5haS9vcGVuYWktY29va2Jvb2svYmxvYi84MzQxODFkNTczOTc0MGViODM4MDA5NmRhYzcwNTZjOTI1NTc4ZDlhL2V4YW1wbGVzL0hvd190b19jb3VudF90b2tlbnNfd2l0aF90aWt0b2tlbi5pcHluYlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVzc2FnZVRva2VuQ291bnQoXG4gIG1lc3NhZ2U6IE9wZW5BSS5DaGF0LkNvbXBsZXRpb25zLkNoYXRDb21wbGV0aW9uTWVzc2FnZVBhcmFtLFxuICBtb2RlbCA9ICdncHQtNG8tbWluaS0yMDI0LTA3LTE4J1xuKTogbnVtYmVyIHtcbiAgbGV0IHRva2Vuc1Blck1lc3NhZ2U6IG51bWJlclxuICBsZXQgdG9rZW5zUGVyTmFtZTogbnVtYmVyXG5cbiAgc3dpdGNoIChtb2RlbCkge1xuICAgIGNhc2UgJ2dwdC0zLjUtdHVyYm8nOlxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnV2FybmluZzogZ3B0LTMuNS10dXJibyBtYXkgY2hhbmdlIG92ZXIgdGltZS4gUmV0dXJuaW5nIG51bSB0b2tlbnMgYXNzdW1pbmcgZ3B0LTMuNS10dXJiby0wMzAxLidcbiAgICAgIClcbiAgICAgIHJldHVybiBnZXRNZXNzYWdlVG9rZW5Db3VudChtZXNzYWdlLCAnZ3B0LTMuNS10dXJiby0wMzAxJylcbiAgICBjYXNlICdncHQtNCc6XG4gICAgICBjb25zb2xlLndhcm4oJ1dhcm5pbmc6IGdwdC00IG1heSBjaGFuZ2Ugb3ZlciB0aW1lLiBSZXR1cm5pbmcgbnVtIHRva2VucyBhc3N1bWluZyBncHQtNC0wMzE0LicpXG4gICAgICByZXR1cm4gZ2V0TWVzc2FnZVRva2VuQ291bnQobWVzc2FnZSwgJ2dwdC00LTAzMTQnKVxuICAgIGNhc2UgJ2dwdC0zLjUtdHVyYm8tMDMwMSc6XG4gICAgICB0b2tlbnNQZXJNZXNzYWdlID0gNCAvLyBldmVyeSBtZXNzYWdlIGZvbGxvd3MgPHxzdGFydHw+e3JvbGUvbmFtZX1cXG57Y29udGVudH08fGVuZHw+XFxuXG4gICAgICB0b2tlbnNQZXJOYW1lID0gLTEgLy8gaWYgdGhlcmUncyBhIG5hbWUsIHRoZSByb2xlIGlzIG9taXR0ZWRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnZ3B0LTRvLW1pbmktMjAyNC0wNy0xOCc6XG4gICAgICB0b2tlbnNQZXJNZXNzYWdlID0gM1xuICAgICAgdG9rZW5zUGVyTmFtZSA9IDFcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnZ3B0LTQtMDMxNCc6XG4gICAgICB0b2tlbnNQZXJNZXNzYWdlID0gM1xuICAgICAgdG9rZW5zUGVyTmFtZSA9IDFcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVua25vd24gbW9kZWwgJyR7bW9kZWx9Jy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuYWkvb3BlbmFpLXB5dGhvbi9ibG9iL21haW4vY2hhdG1sLm1kIGZvciBpbmZvcm1hdGlvbiBvbiBob3cgbWVzc2FnZXMgYXJlIGNvbnZlcnRlZCB0byB0b2tlbnMuYFxuICAgICAgKVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2UpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBhY2MgKz0gdG9rZW5pemVyLmVuY29kZSh2YWx1ZSkubGVuZ3RoXG4gICAgaWYgKGtleSA9PT0gJ25hbWUnKSB7XG4gICAgICBhY2MgKz0gdG9rZW5zUGVyTmFtZVxuICAgIH1cbiAgICByZXR1cm4gYWNjXG4gIH0sIHRva2Vuc1Blck1lc3NhZ2UpXG59XG5cbi8qKlxuICogR2V0IHRoZSBtYXhpbXVtIG51bWJlciBvZiB0b2tlbnMgZm9yIGEgbW9kZWwncyBjb250ZXh0LlxuICpcbiAqIEluY2x1ZGVzIHRva2VucyBpbiBib3RoIG1lc3NhZ2UgYW5kIGNvbXBsZXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhUb2tlbkNvdW50KG1vZGVsOiBzdHJpbmcpOiBudW1iZXIge1xuICBzd2l0Y2ggKG1vZGVsKSB7XG4gICAgY2FzZSAnZ3B0LTMuNS10dXJibyc6XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdXYXJuaW5nOiBncHQtMy41LXR1cmJvIG1heSBjaGFuZ2Ugb3ZlciB0aW1lLiBSZXR1cm5pbmcgbWF4IG51bSB0b2tlbnMgYXNzdW1pbmcgZ3B0LTMuNS10dXJiby0wMzAxLidcbiAgICAgIClcbiAgICAgIHJldHVybiBnZXRNYXhUb2tlbkNvdW50KCdncHQtMy41LXR1cmJvLTAzMDEnKVxuICAgIGNhc2UgJ2dwdC00JzpcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1dhcm5pbmc6IGdwdC00IG1heSBjaGFuZ2Ugb3ZlciB0aW1lLiBSZXR1cm5pbmcgbWF4IG51bSB0b2tlbnMgYXNzdW1pbmcgZ3B0LTQtMDMxNC4nXG4gICAgICApXG4gICAgICByZXR1cm4gZ2V0TWF4VG9rZW5Db3VudCgnZ3B0LTQtMDMxNCcpXG4gICAgY2FzZSAnZ3B0LTMuNS10dXJiby0wMzAxJzpcbiAgICAgIHJldHVybiA0MDk3XG4gICAgY2FzZSAnZ3B0LTQtMDMxNCc6XG4gICAgICByZXR1cm4gNDA5N1xuICAgIGNhc2UgJ2dwdC00by1taW5pLTIwMjQtMDctMTgnOlxuICAgICAgcmV0dXJuIDQwOTdcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1vZGVsICcke21vZGVsfSdgKVxuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLFdBQUEsR0FBQUMsT0FBQTtBQUF5QyxTQUFBQyxlQUFBQyxDQUFBLEVBQUFDLENBQUEsV0FBQUMsZUFBQSxDQUFBRixDQUFBLEtBQUFHLHFCQUFBLENBQUFILENBQUEsRUFBQUMsQ0FBQSxLQUFBRywyQkFBQSxDQUFBSixDQUFBLEVBQUFDLENBQUEsS0FBQUksZ0JBQUE7QUFBQSxTQUFBQSxpQkFBQSxjQUFBQyxTQUFBO0FBQUEsU0FBQUYsNEJBQUFKLENBQUEsRUFBQU8sQ0FBQSxRQUFBUCxDQUFBLDJCQUFBQSxDQUFBLFNBQUFRLGlCQUFBLENBQUFSLENBQUEsRUFBQU8sQ0FBQSxPQUFBRSxDQUFBLE1BQUFDLFFBQUEsQ0FBQUMsSUFBQSxDQUFBWCxDQUFBLEVBQUFZLEtBQUEsNkJBQUFILENBQUEsSUFBQVQsQ0FBQSxDQUFBYSxXQUFBLEtBQUFKLENBQUEsR0FBQVQsQ0FBQSxDQUFBYSxXQUFBLENBQUFDLElBQUEsYUFBQUwsQ0FBQSxjQUFBQSxDQUFBLEdBQUFNLEtBQUEsQ0FBQUMsSUFBQSxDQUFBaEIsQ0FBQSxvQkFBQVMsQ0FBQSwrQ0FBQVEsSUFBQSxDQUFBUixDQUFBLElBQUFELGlCQUFBLENBQUFSLENBQUEsRUFBQU8sQ0FBQTtB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LFlBQVksQ0FBQztJQUNwRCxLQUFLLG9CQUFvQjtNQUN2QkUsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFDO01BQ3JCQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEVBQUM7TUFDbkI7SUFDRixLQUFLLHdCQUF3QjtNQUMzQkQsZ0JBQWdCLEdBQUcsQ0FBQztNQUNwQkMsYUFBYSxHQUFHLENBQUM7TUFDakI7SUFDRixLQUFLLFlBQVk7TUFDZkQsZ0JBQWdCLEdBQUcsQ0FBQztNQUNwQkMsYUFBYSxHQUFHLENBQUM7TUFDakI7SUFDRjtNQUNFLE1BQU0sSUFBSUcsS0FBSyxtQkFBQUMsTUFBQSxDQUNLZCxLQUFLLGdJQUN6QixDQUFDO0VBQ0w7RUFFQSxPQUFPVixNQUFNLENBQUN5QixPQUFPLENBQUNSLE9BQU8sQ0FBQyxDQUFDRixNQUFNLENBQUMsVUFBQ0MsR0FBRyxFQUFBVSxJQUFBLEVBQW1CO0lBQUEsSUFBQUMsS0FBQSxHQUFBeEQsY0FBQSxDQUFBdUQsSUFBQTtNQUFoQkUsR0FBRyxHQUFBRCxLQUFBO01BQUV4QixLQUFLLEdBQUF3QixLQUFBO0lBQ3JEWCxHQUFHLElBQUlYLFNBQVMsQ0FBQ3dCLE1BQU0sQ0FBQzFCLEtBQUssQ0FBQyxDQUFDYixNQUFNO0lBQ3JDLElBQUlzQyxHQUFHLEtBQUssTUFBTSxFQUFFO01BQ2xCWixHQUFHLElBQUlJLGFBQWE7SUFDdEI7SUFDQSxPQUFPSixHQUFHO0VBQ1osQ0FBQyxFQUFFRyxnQkFBZ0IsQ0FBQztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU1csZ0JBQWdCQSxDQUFDcEIsS0FBYSxFQUFVO0VBQ3RELFFBQVFBLEtBQUs7SUFDWCxLQUFLLGVBQWU7TUFDbEJXLE9BQU8sQ0FBQ0MsSUFBSSxDQUNWLG9HQUNGLENBQUM7TUFDRCxPQUFPUSxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztJQUMvQyxLQUFLLE9BQU87TUFDVlQsT0FBTyxDQUFDQyxJQUFJLENBQ1Ysb0ZBQ0YsQ0FBQztNQUNELE9BQU9RLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN2QyxLQUFLLG9CQUFvQjtNQUN2QixPQUFPLElBQUk7SUFDYixLQUFLLFlBQVk7TUFDZixPQUFPLElBQUk7SUFDYixLQUFLLHdCQUF3QjtNQUMzQixPQUFPLElBQUk7SUFDYjtNQUNFLE1BQU0sSUFBSVAsS0FBSyxtQkFBQUMsTUFBQSxDQUFtQmQsS0FBSyxNQUFHLENBQUM7RUFDL0M7QUFDRiIsImlnbm9yZUxpc3QiOltdfQ==