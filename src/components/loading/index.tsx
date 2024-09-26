import { Spin } from 'antd';

function Loading({ content }: { content: string }) {
  return (
    <Spin
      tip={content}
      fullscreen
      size='large'></Spin>
  );
}

export default Loading;
