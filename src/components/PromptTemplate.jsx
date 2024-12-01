import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MinusIcon,
  ArrowsUpDownIcon,
  DocumentDuplicateIcon,
  AdjustmentsHorizontalIcon,
  CheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { generatePrompt, vocabularyLibrary } from '../utils/promptGenerator';

const defaultTemplates = [
  {
    name: '标准模板',
    structure: [
      { type: 'text', value: 'Create', required: true },
      { type: 'variable', name: 'subject', required: true },
      { type: 'text', value: 'in the style of', required: true },
      { type: 'variable', name: 'style', required: true },
      { type: 'text', value: 'with', required: false },
      { type: 'variable', name: 'lighting', required: false },
      { type: 'text', value: 'lighting', required: false },
    ]
  },
  {
    name: '详细模板',
    structure: [
      { type: 'text', value: 'I want you to create', required: true },
      { type: 'variable', name: 'subject', required: true },
      { type: 'text', value: 'The style should be', required: true },
      { type: 'variable', name: 'style', required: true },
      { type: 'text', value: 'Use', required: false },
      { type: 'variable', name: 'lighting', required: false },
      { type: 'text', value: 'lighting and', required: false },
      { type: 'variable', name: 'camera', required: false },
      { type: 'text', value: 'perspective', required: false },
    ]
  }
];

export default function PromptTemplate({ onApply }) {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTemplate = () => {
    const newTemplate = {
      name: '新模板',
      structure: [
        { type: 'text', value: '', required: true },
        { type: 'variable', name: '', required: true }
      ]
    };
    setTemplates([...templates, newTemplate]);
    setEditingTemplate(templates.length);
  };

  const handleEditStructure = (templateIndex, structureIndex, field, value) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].structure[structureIndex][field] = value;
    setTemplates(newTemplates);
  };

  const handleAddStructureItem = (templateIndex, type) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].structure.push({
      type,
      value: type === 'text' ? '' : '',
      name: type === 'variable' ? '' : undefined,
      required: false
    });
    setTemplates(newTemplates);
  };

  const handleRemoveStructureItem = (templateIndex, structureIndex) => {
    const newTemplates = [...templates];
    newTemplates[templateIndex].structure.splice(structureIndex, 1);
    setTemplates(newTemplates);
  };

  const handleMoveStructureItem = (templateIndex, structureIndex, direction) => {
    const newTemplates = [...templates];
    const structure = newTemplates[templateIndex].structure;
    const newIndex = structureIndex + direction;
    
    if (newIndex >= 0 && newIndex < structure.length) {
      [structure[structureIndex], structure[newIndex]] = 
      [structure[newIndex], structure[structureIndex]];
      setTemplates(newTemplates);
    }
  };

  const getVariableSuggestions = (name) => {
    return Object.keys(vocabularyLibrary).filter(key =>
      key.toLowerCase().includes(name.toLowerCase())
    );
  };

  const validateTemplate = (template) => {
    const requiredVariables = template.structure
      .filter(item => item.type === 'variable' && item.required)
      .map(item => item.name);

    const missingVariables = requiredVariables.filter(name => 
      !vocabularyLibrary[name.toLowerCase()]
    );

    if (missingVariables.length > 0) {
      throw new Error(`未找到以下必填变量的词库：${missingVariables.join(', ')}`);
    }
  };

  const handleApplyTemplate = (template) => {
    setError(null); // 清除之前的错误
    
    try {
      // 验证模板
      validateTemplate(template);

      // 将模板结构转换为字符串格式
      const promptTemplate = template.structure.map(item => {
        if (item.type === 'text') {
          return item.value;
        } else if (item.type === 'variable') {
          return `{${item.name}}`;
        }
        return '';
      }).filter(Boolean).join(' ');

      // 使用新的生成器生成提示词
      const generatedPrompt = generatePrompt(promptTemplate);
      
      // 调用父组件的回调函数
      onApply(generatedPrompt);
      
      // 显示成功提示
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError(error.message || '生成提示词时出错');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDuplicateTemplate = (templateIndex) => {
    const newTemplate = JSON.parse(JSON.stringify(templates[templateIndex]));
    newTemplate.name += ' (副本)';
    setTemplates([...templates, newTemplate]);
  };

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
        >
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </motion.div>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">提示词模板</h3>
          <p className="text-sm text-gray-400">自定义提示词结构和框架</p>
        </div>
        <button
          onClick={handleAddTemplate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          新建模板
        </button>
      </div>

      <div className="grid gap-4">
        {templates.map((template, templateIndex) => (
          <motion.div
            key={templateIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                {editingTemplate === templateIndex ? (
                  <input
                    type="text"
                    value={template.name}
                    onChange={(e) => {
                      const newTemplates = [...templates];
                      newTemplates[templateIndex].name = e.target.value;
                      setTemplates(newTemplates);
                    }}
                    onBlur={() => setEditingTemplate(null)}
                    className="bg-transparent border-b border-white/20 text-white focus:border-blue-500 outline-none px-1 py-0.5"
                    autoFocus
                  />
                ) : (
                  <h4
                    className="text-white font-medium cursor-pointer hover:text-blue-400"
                    onClick={() => setEditingTemplate(templateIndex)}
                  >
                    {template.name}
                  </h4>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDuplicateTemplate(templateIndex)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-colors"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const newTemplates = [...templates];
                    newTemplates.splice(templateIndex, 1);
                    setTemplates(newTemplates);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {template.structure.map((item, structureIndex) => (
                <div
                  key={structureIndex}
                  className="flex items-center gap-2 group/item"
                >
                  <div className="flex-1 flex items-center gap-2">
                    <select
                      value={item.type}
                      onChange={(e) => handleEditStructure(templateIndex, structureIndex, 'type', e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="text">文本</option>
                      <option value="variable">变量</option>
                    </select>
                    {item.type === 'text' ? (
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) => handleEditStructure(templateIndex, structureIndex, 'value', e.target.value)}
                        placeholder="输入固定文本..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleEditStructure(templateIndex, structureIndex, 'name', e.target.value)}
                          placeholder="输入变量名..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {item.name && (
                          <div className="absolute left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                            {getVariableSuggestions(item.name).map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleEditStructure(templateIndex, structureIndex, 'name', suggestion)}
                                className="w-full px-3 py-1.5 text-left text-sm text-gray-300 hover:bg-gray-700"
                              >
                                {suggestion}
                                <span className="ml-2 text-xs text-gray-500">
                                  ({vocabularyLibrary[suggestion].name})
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                      <input
                        type="checkbox"
                        checked={item.required}
                        onChange={(e) => handleEditStructure(templateIndex, structureIndex, 'required', e.target.checked)}
                        className="rounded border-gray-400 text-blue-500 focus:ring-blue-500"
                      />
                      必填
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveStructureItem(templateIndex, structureIndex, -1)}
                      disabled={structureIndex === 0}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      <ArrowsUpDownIcon className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => handleMoveStructureItem(templateIndex, structureIndex, 1)}
                      disabled={structureIndex === template.structure.length - 1}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      <ArrowsUpDownIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveStructureItem(templateIndex, structureIndex)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors opacity-0 group-hover/item:opacity-100"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddStructureItem(templateIndex, 'text')}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  添加文本
                </button>
                <button
                  onClick={() => handleAddStructureItem(templateIndex, 'variable')}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  添加变量
                </button>
              </div>
              <button
                onClick={() => handleApplyTemplate(template)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {showSuccess ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    已应用
                  </>
                ) : (
                  <>
                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                    应用模板
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
