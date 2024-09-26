export interface IEnv {
  SERVER_URL: string;
}

const DEV: IEnv = {
  SERVER_URL: 'https://basic-ecommerce-server.onrender.com',
};

const ENV = {
  DEV,
};

export default ENV['DEV'];
